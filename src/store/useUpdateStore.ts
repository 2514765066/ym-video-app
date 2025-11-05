import { appVersion, appName } from "@/services/info";
import { formatVersion } from "@/utils/format";
import { Paths, File } from "expo-file-system";
import {
  createDownloadResumable,
  deleteAsync,
  getContentUriAsync,
} from "expo-file-system/legacy";
import { proxy } from "valtio";
import { startActivityAsync } from "expo-intent-launcher";
import storage from "@/services/storage";
import { configState } from "./useConfigStore";
import { getTimeDiff } from "@/utils/time";

//更新源
const RELEASES_URL =
  "https://gitee.com/api/v5/repos/yxingyus/ym-video-app/releases";

//最新版本
const LATEST_URL = `${RELEASES_URL}/latest`;

type UpdateState = {
  lastUpdateTime: number;

  updateProgress: number;

  updateInfo: {
    version: string;
    downloadUrl: string;
    md5: string;
  };

  updateStatus:
    | "init"
    | "checking"
    | "update-available"
    | "update-not-available";

  downloadStatus: "init" | "downloading" | "downloaded" | "failed";

  installStatus: "init" | "canceled" | "success";
};

export const updateState = proxy<UpdateState>({
  //上次检测时间
  lastUpdateTime: 0,

  //更新进度
  updateProgress: 0,

  //更新信息
  updateInfo: {
    version: "",
    downloadUrl: "",
    md5: "",
  },

  //更新状态
  updateStatus: "init",

  //下载状态
  downloadStatus: "init",

  //安装状态
  installStatus: "init",
});

interface UpdateInfo {
  assets: {
    browser_download_url: string;
    name: string;
  }[];
  name: string;
  tag_name: string;
}

interface UpdateConfig {
  md5: string;
}

//获取配置
const getJson = async (url: string) => {
  const response = await fetch(url);

  return await response.json();
};

//检查更新
export const checkUpdate = async () => {
  updateState.updateStatus = "checking";

  save();

  const response = await fetch(LATEST_URL);

  if (response.status != 200) {
    updateState.updateStatus = "update-not-available";
    return;
  }

  const updateInfo: UpdateInfo = await response.json();

  //不需要更新
  if (formatVersion(appVersion) >= formatVersion(updateInfo.name)) {
    updateState.updateStatus = "update-not-available";
    return;
  }

  //找到对应的配置信息
  const latestConfig = updateInfo.assets.find(
    item => item.name == "latest.json"
  );

  //找到对应的安装包
  const latestInfo = updateInfo.assets.find(
    item => item.name == `${appName}-${updateInfo.name}.apk`
  );

  if (!latestInfo || !latestConfig) {
    updateState.updateStatus = "update-not-available";
    return;
  }

  const { md5 }: UpdateConfig = await getJson(
    latestConfig.browser_download_url
  );

  updateState.updateInfo = {
    version: updateInfo.name,
    downloadUrl: latestInfo.browser_download_url,
    md5,
  };

  updateState.updateStatus = "update-available";

  return true;
};

//下载
export const download = async () => {
  updateState.downloadStatus = "downloading";

  const pathname = updateState.updateInfo.downloadUrl.split("/").at(-1)!;

  const file = new File(Paths.cache, pathname);

  if (file.md5 == updateState.updateInfo.md5) {
    updateState.downloadStatus = "downloaded";

    install(file.uri);
    return;
  }

  if (file.exists) {
    await deleteAsync(file.uri);
  }

  const downloadResumable = createDownloadResumable(
    updateState.updateInfo.downloadUrl,
    file.uri,
    {},
    downloadProgress => {
      const progress =
        downloadProgress.totalBytesWritten /
        downloadProgress.totalBytesExpectedToWrite;

      updateState.updateProgress = Math.floor(progress * 100);
    }
  );

  const res = await downloadResumable.downloadAsync();

  if (res?.status == 200) {
    updateState.downloadStatus = "downloaded";

    install(res.uri);
    return;
  }

  updateState.downloadStatus = "failed";
};

//安装
export const install = async (uri: string) => {
  const contentUri = await getContentUriAsync(uri);

  const intentLauncherResult = await startActivityAsync(
    "android.intent.action.VIEW",
    {
      data: contentUri,
      flags: 1,
      type: "application/vnd.android.package-archive",
    }
  );

  if (intentLauncherResult.resultCode == 0) {
    updateState.installStatus = "canceled";
    return;
  }

  if (intentLauncherResult.resultCode == -1) {
    updateState.installStatus = "success";
    return;
  }
};

//保存
const save = () => {
  const date = Date.now();

  updateState.lastUpdateTime = date;

  storage.setItem("lastUpdateTime", JSON.stringify(date));
};

//初始化
const init = () => {
  const res = storage.getItem("lastUpdateTime");

  if (res) {
    updateState.lastUpdateTime = JSON.parse(res);
  }

  if (configState.autoUpdate) {
    if (getTimeDiff(updateState.lastUpdateTime, Date.now()) > 3) {
      checkUpdate();
    }
  }
};

init();
