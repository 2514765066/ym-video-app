import { getSearch } from "@/services/api";
import { MovieInfo } from "@/type";
import { proxy } from "valtio";

type MovieStore = {
  keyword: string;
  data: MovieInfo[];
  page: number;
  pageCount: number;
  loading: boolean;
};

//仓库
export const searchState = proxy<MovieStore>({
  //搜索关键词
  keyword: "",

  //搜索数据
  data: [],

  //当前页
  page: 0,

  //总共页数
  pageCount: 1,

  //是否加载
  loading: false,
});

//获取数据
const getData = async () => {
  const res = await getSearch({
    keyword: searchState.keyword,
    page: searchState.page + 1,
  });

  searchState.page++;

  return res;
};

//搜索
export const search = async (keyword: string) => {
  searchState.loading = true;

  searchState.keyword = keyword;

  searchState.page = 0;

  const { data, pageCount } = await getData();

  searchState.data = data;

  searchState.pageCount = pageCount;

  setTimeout(() => {
    searchState.loading = false;
  }, 0);
};

//加载更多数据
export const loadData = async () => {
  if (searchState.data.length == 0) {
    return;
  }

  if (searchState.page == searchState.pageCount) {
    return;
  }

  const { data } = await getData();

  searchState.data.push(...data);
};
