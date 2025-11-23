import { getCategory, getMovie } from "@/services/api";
import { Category, MovieInfo } from "@/type";
import { proxy } from "valtio";
import { proxyMap } from "valtio/utils";

type MovieStore = {
  category: Map<number, Category>;

  childCategory: Map<number, Category[]>;

  selectedCategoryID: number;

  selectedChildCategoryID: number;

  data: MovieInfo[];

  page: number;

  pageCount: number;

  status: "init" | "loading" | "empty" | "end" | "finish";
};

const createInitState = (): MovieStore => {
  return {
    //分类
    category: proxyMap(),

    //子分类
    childCategory: proxyMap(),

    //选中的大分类
    selectedCategoryID: 0,

    //选中的小分类
    selectedChildCategoryID: 0,

    //大分类数据
    data: [],

    //当前页数
    page: 0,

    //总共页数
    pageCount: 0,

    //状态
    status: "init",
  };
};

//仓库
export const movieState = proxy<MovieStore>();

//获取数据
const getData = async () => {
  movieState.status = "loading";

  const res = await getMovie({
    tid: movieState.selectedChildCategoryID,
    page: ++movieState.page,
  });

  //如果没有资源
  if (res.pageCount == 0) {
    movieState.status = "empty";

    return res;
  }

  //所有资源请求完成
  if (movieState.page == res.pageCount) {
    movieState.status = "end";

    return res;
  }

  movieState.status = "finish";

  return res;
};

//切换大分类
export const updateCategory = (id: number) => {
  if (movieState.selectedCategoryID == id) {
    return;
  }

  movieState.selectedCategoryID = id;

  const childCategory = movieState.childCategory.get(id);

  if (childCategory) {
    updateChildCategory(childCategory[0].id);
    return;
  }

  updateChildCategory(id);
};

//切换小分类
export const updateChildCategory = async (id: number) => {
  //选择同一个分类
  if (movieState.selectedChildCategoryID == id) {
    return;
  }

  movieState.data = [];

  movieState.selectedChildCategoryID = id;

  movieState.page = 0;

  const { data, pageCount } = await getData();

  //解决快速点击页面出现错乱的bug
  if (movieState.selectedChildCategoryID != id) {
    return;
  }

  movieState.data = data;

  movieState.pageCount = pageCount;
};

//加载更多数据
export const loadData = async () => {
  if (movieState.data.length == 0) {
    return;
  }

  if (movieState.page == movieState.pageCount) {
    return;
  }

  const { data } = await getData();

  movieState.data.push(...data);
};

export const init = async () => {
  Object.assign(movieState, createInitState());

  movieState.status = "loading";

  const { firstID, category, childCategory } = await getCategory();

  movieState.category = category;

  movieState.childCategory = childCategory;

  updateCategory(firstID);
};
