//暴风资源detail返回值
export type Detail_Res = {
  total: number;
  pagecount: number;
  page: number;
  list: Detail_Res_List[];
};

export type Detail_Res_List = {
  vod_content: string;
  vod_id: number;
  vod_duration: string;
  vod_name: string;
  vod_pic: string;
  vod_play_url: string;
  vod_year: string;
  vod_area: string;
  vod_lang: string;
  type_name: string;
  vod_remarks: string;
  vod_play_from: string;
  vod_douban_score: number;
};

//选集
export type Episode = {
  label: string;
  value: number;
  url: string;
};

//进度
export type Progress = {
  duration: number;
  currentTime: number;
};

//视频信息
export type HistoryInfo = MovieInfo & {
  history: number;
  time: number;
  progress: Progress[];
};

//电影信息
export type MovieInfo = {
  name: string;
  sub: string;
  id: string;
  pic: string;
  year: string;
  area: string;
  lang: string;
  type: string;
  url: Episode[];
  remarks: string;
};
