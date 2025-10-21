import { getRecommend } from "@/services/api";
import { MovieInfo } from "@/type";
import { proxy } from "valtio";

//分类
export const categories = [
  {
    label: "电影",
    id: 20,
    children: [
      {
        id: 21,
        label: "动作",
      },
      {
        id: 22,
        label: "喜剧",
      },
      {
        id: 23,
        label: "恐怖",
      },
      {
        id: 24,
        label: "科幻",
      },
      {
        id: 25,
        label: "爱情",
      },
      {
        id: 50,
        label: "动画",
      },
      {
        id: 26,
        label: "剧情",
      },
      {
        id: 27,
        label: "战争",
      },
      {
        id: 28,
        label: "纪录",
      },
      {
        id: 29,
        label: "理论",
      },
    ],
  },
  {
    label: "动漫",
    id: 39,
    children: [
      {
        id: 40,
        label: "国产",
      },
      {
        id: 41,
        label: "日韩",
      },
      {
        id: 42,
        label: "欧美",
      },
      {
        id: 43,
        label: "港台",
      },
      {
        id: 44,
        label: "海外",
      },
    ],
  },
  {
    label: "综艺",
    id: 45,
    children: [
      {
        id: 46,
        label: "大陆",
      },
      {
        id: 47,
        label: "港台",
      },
      {
        id: 48,
        label: "日韩",
      },
      {
        id: 49,
        label: "欧美",
      },
    ],
  },
  {
    label: "电视剧",
    id: 30,
    children: [
      {
        id: 31,
        label: "国产",
      },
      {
        id: 32,
        label: "欧美",
      },
      {
        id: 33,
        label: "香港",
      },
      {
        id: 34,
        label: "韩国",
      },
      {
        id: 35,
        label: "台湾",
      },
      {
        id: 36,
        label: "日本",
      },
      {
        id: 37,
        label: "海外",
      },
      {
        id: 38,
        label: "泰国",
      },
    ],
  },
];

type MovieStore = {
  data: MovieInfo[];

  selectedCategory: number;

  selectedChildCategory: number;

  loading: boolean;

  page: number;

  pageCount: number;
};

//仓库
export const movieState = proxy<MovieStore>({
  //大分类数据
  data: [],

  //选中的大分类
  selectedCategory: 0,

  //选中的小分类
  selectedChildCategory: 0,

  //是否重新加载分类
  loading: false,

  //当前页数
  page: 0,

  //总共页数
  pageCount: 0,
});

//获取当前的type-id
const getTypeId = () => {
  const { children } = categories[movieState.selectedCategory];
  const { id } = children[movieState.selectedChildCategory];

  return id;
};

//获取数据
const getCategoryData = async () => {
  const tid = getTypeId();

  const res = await getRecommend({
    tid,
    page: movieState.page + 1,
  });

  movieState.page++;

  return res;
};

//切换大分类
export const changeCategory = (index: number = 0) => {
  movieState.selectedCategory = index;

  changeChildCategory(0);
};

//切换小分类
export const changeChildCategory = async (index: number) => {
  movieState.loading = true;

  movieState.selectedChildCategory = index;

  movieState.page = 0;

  const { data, pageCount } = await getCategoryData();

  movieState.data = data;

  movieState.pageCount = pageCount;

  movieState.loading = false;
};

//加载更多数据
export const loadCategoryData = async () => {
  if (movieState.data.length == 0) {
    return;
  }

  if (movieState.page == movieState.pageCount) {
    return;
  }

  const { data } = await getCategoryData();

  movieState.data.push(...data);
};

//初始化
const init = () => {
  changeCategory();
};

init();
