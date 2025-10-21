import { HistoryInfo, MovieInfo } from "@/type";
import { proxy } from "valtio";
import { deepClone } from "valtio/utils";

type MovieStore = {
  data: HistoryInfo;
};

export const detailState = proxy<MovieStore>({
  data: {
    name: "",
    pic: "",
    sub: "",
    id: "",
    year: "",
    area: "",
    lang: "",
    type: "",
    url: [],
    remarks: "",
    history: 0,
    time: 0,
    progress: [],
  },
});

//更新数据
export const updateDetail = (data: MovieInfo | HistoryInfo) => {
  detailState.data = {
    history: 0,
    time: 0,
    progress: [],
    ...data,
  };
};

//获取data
export const getDetailData = () => {
  return deepClone(detailState.data);
};
