import { appVersion, appName } from "@/services/info";
import { formatVersion } from "@/utils/format";
import { Paths, File } from "expo-file-system";
import { createDownloadResumable } from "expo-file-system/legacy";
import { proxy } from "valtio";
import { startActivityAsync } from "expo-intent-launcher";
import storage from "@/services/storage";
import { configState } from "./useConfigStore";

//更新源
const RELEASES_URL =
  "https://gitee.com/api/v5/repos/yxingyus/ym-video-app/releases";

//最新版本
const LATEST_URL = `${RELEASES_URL}/latest`;

export const updateState = proxy({
  //上次检测时间
  lastUpdateTime: 1762180172278,

  //是否更新
  isUpdate: false,

  //更新进度
  updateProgress: 0,

  //更新信息
  updateInfo: {
    version: "",
    downloadUrl: "",
  },
});

interface UpdateInfo {
  assets: {
    browser_download_url: string;
    name: string;
  }[];
  name: string;
  tag_name: string;
}

//检查更新
export const checkUpdate = async () => {
  save();

  const response = await fetch(LATEST_URL);

  if (response.status == 404) {
    return;
  }

  const updateInfo: UpdateInfo = await response.json();

  //不需要更新
  if (formatVersion(appVersion) >= formatVersion(updateInfo.name)) {
    updateState.isUpdate = false;
    return;
  }

  //找到对应的安装包
  const latestInfo = updateInfo.assets.find(
    item => item.name == `${appName}-${updateInfo.name}.apk`
  );

  if (!latestInfo) {
    updateState.isUpdate = false;
    return;
  }

  updateState.updateInfo = {
    version: updateInfo.name,
    downloadUrl: latestInfo.browser_download_url,
  };

  updateState.isUpdate = true;

  return true;
};

//下载
export const download = async () => {
  const file = new File(Paths.cache, `${appName}-latest.apk`);

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
    setup(res.uri);
  }
};

//安装
export const setup = async (url: string) => {
  await startActivityAsync("android.intent.action.VIEW", {
    data: url,
    type: "application/vnd.android.package-archive",
    flags: 1,
  });
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
    checkUpdate();
  }
};

init();
