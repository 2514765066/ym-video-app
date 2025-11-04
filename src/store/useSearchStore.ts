import storage from "@/services/storage";
import { KeywordHistory } from "@/type";
import { proxy } from "valtio";
import { proxyMap } from "valtio/utils";

type MovieStore = {
  data: Map<string, KeywordHistory>;

  selectedKeyword: string;
};

//仓库
export const searchState = proxy<MovieStore>({
  //搜索历史
  data: proxyMap(),

  //当前选中的搜索历史
  selectedKeyword: "",
});

//保存
const save = () => {
  const data = JSON.stringify(Array.from(searchState.data));

  storage.setItem("search-history", data);
};

//添加搜索历史
export const add = (keyword: string) => {
  if (searchState.data.has(keyword)) {
    return;
  }

  searchState.data.set(keyword, {
    label: keyword,
    time: Date.now(),
  });

  save();
};

//更新时间
export const updateTime = (keyword: string) => {
  searchState.data.get(keyword)!.time = Date.now();
};

//删除搜索历史
export const remove = (keyword: string) => {
  if (!searchState.data.has(keyword)) {
    return;
  }

  searchState.data.delete(keyword);

  save();
};

//清空历史记录
export const clear = () => {
  searchState.data.clear();
};

const init = () => {
  const res = storage.getItem("search-history");

  if (res) {
    searchState.data = proxyMap(JSON.parse(res));
  }
};

init();
