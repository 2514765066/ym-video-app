import storage from "@/services/storage";
import { proxy, subscribe } from "valtio";

export const configState = proxy({
  //自动更新
  autoUpdate: false,

  //源名称
  source: {
    label: "量子资源",
    url: "https://cj.lziapi.com/api.php/provide/vod/",
  },

  //仓库名称
  repo: {
    label: "Gitee",
    url: "https://gitee.com/yxingyus/ym-video-app",
    updateUrl:
      "https://gitee.com/api/v5/repos/yxingyus/ym-video-app/releases/latest",
  },
});

//切换自动更新
export const toggleAutoUpdate = () => {
  configState.autoUpdate = !configState.autoUpdate;
};

//更新源名称
export const setSource = (option: { label: string; url: string }) => {
  configState.source = option;
};

//更新仓库
export const setRepo = (option: {
  label: string;
  url: string;
  updateUrl: string;
}) => {
  configState.repo = option;
};

//保存
const save = () => {
  storage.setItem("config", JSON.stringify(configState));
};

//初始化
const init = () => {
  const res = storage.getItem("config");

  if (!res) {
    return;
  }

  Object.assign(configState, JSON.parse(res));

  //自动保存配置
  subscribe(configState, () => {
    save();
  });
};

init();
