import { MovieInfo } from "@/type";
import { proxy } from "valtio";
import { getSearch } from "@/services/api";

type MovieStore = {
  keyword: string;

  data: MovieInfo[];

  page: number;

  pageCount: number;

  status: "init" | "loading" | "finish" | "end" | "empty";
};

const createInitialState = (): MovieStore => ({
  //搜索关键词
  keyword: "",

  //搜索结果
  data: [],

  //当前页
  page: 0,

  //总页数
  pageCount: 0,

  //状态
  status: "init",
});

//仓库
export const searchDataState = proxy<MovieStore>(createInitialState());

//获取数据
const getData = async () => {
  searchDataState.status = "loading";

  const res = await getSearch({
    keyword: searchDataState.keyword,
    page: ++searchDataState.page,
  });

  //如果没有资源
  if (res.pageCount == 0) {
    searchDataState.status = "empty";

    return res;
  }

  //所有资源请求完成
  if (searchDataState.page == res.pageCount) {
    searchDataState.status = "end";

    return res;
  }

  searchDataState.status = "finish";

  return res;
};

//搜索
export const searchData = async (keyword: string) => {
  searchDataState.data = [];

  searchDataState.keyword = keyword;

  searchDataState.page = 0;

  const { data, pageCount } = await getData();

  searchDataState.data = data;

  searchDataState.pageCount = pageCount;
};

//加载更多
export const loadData = async () => {
  if (searchDataState.data.length == 0) {
    return;
  }

  if (searchDataState.page == searchDataState.pageCount) {
    return;
  }

  const { data } = await getData();

  searchDataState.data.push(...data);
};
