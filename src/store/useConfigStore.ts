import storage from "@/services/storage";
import { proxy, subscribe } from "valtio";

export const configState = proxy({
  //自动更新
  autoUpdate: false,

  //源名称
  sourceName: "暴风资源",
});

//切换自动更新
export const toggleAutoUpdate = () => {
  configState.autoUpdate = !configState.autoUpdate;
};

//更新源名称
export const setSourceName = (name: string) => {
  if (configState.sourceName == name) {
    return;
  }

  configState.sourceName = name;
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
