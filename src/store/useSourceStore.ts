import { proxy } from "valtio";
import { proxyMap } from "valtio/utils";
import { configState } from "./useConfigStore";

type Source = {
  label: string;
  value: string;
};

//资源
export const sources = [
  {
    label: "暴风资源",
    value: "https://bfzyapi.com/api.php/provide/vod",
  },
  {
    label: "量子资源",
    value: "https://cj.lziapi.com/api.php/provide/vod",
  },
  {
    label: "如意资源",
    value: "http://cj.rycjapi.com/api.php/provide/vod",
  },
  {
    label: "茅台资源",
    value: "https://caiji.maotaizy.cc/api.php/provide/vod",
  },
  {
    label: "极速资源",
    value: "https://jszyapi.com/api.php/provide/vod",
  },
  {
    label: "豆瓣资源",
    value: "https://dbzy.tv/api.php/provide/vod",
  },
  {
    label: "魔都资源",
    value: "https://www.mdzyapi.com/api.php/provide/vod",
  },
];

type ConfigState = {
  data: Map<string, Source>;

  selectedSource: Source;
};

export const sourceState = proxy<ConfigState>({
  data: proxyMap(sources.map(item => [item.label, item])),

  get selectedSource() {
    return (
      this.data.get(configState.sourceName) || {
        label: "",
        value: "",
      }
    );
  },
});

//获取源
export const getSource = (label: string) => {
  return sourceState.data.get(label)!.value;
};
