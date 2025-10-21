import { Detail_Res_List, Detail_Res, MovieInfo } from "@/type";
import { formatRemarks } from "@/utils/format";
import { request } from "@/utils/request";

//api
export const API_URL = "https://bfzyapi.com/api.php/provide/vod/";

//处理播放url
const handlePlayUrl = (url: string) => {
  return url.split("#").map((item, index) => {
    const [label, url] = item.split("$");

    return {
      label: formatRemarks(label),
      value: index,
      url,
      duration: 0,
      currentTime: 0,
    };
  });
};

interface RecommendOption {
  tid: string | number;
  page?: number;
}

const handleResult = (res: Detail_Res_List[]): MovieInfo[] => {
  return res
    .filter(item => item.type_name != "电影解说" && item.type_name != "预告片")
    .map(item => {
      return {
        name: item.vod_name,
        sub: item.vod_content,
        id: `${item.vod_play_from},${item.vod_id}`,
        pic: item.vod_pic,
        year: item.vod_year,
        area: item.vod_area,
        lang: item.vod_lang,
        type: item.type_name,
        url: handlePlayUrl(item.vod_play_url),
        remarks: item.vod_remarks,
        score: item.vod_douban_score,
      };
    });
};

//推荐
export const getRecommend = async ({ tid, page = 1 }: RecommendOption) => {
  //获取基本信息
  const { list, pagecount } = await request<Detail_Res>(API_URL, {
    ac: "detail",
    t: tid,
    pg: page,
  });

  return {
    data: handleResult(list),
    pageCount: pagecount,
  };
};

interface SearchOption {
  keyword: string;
  page?: number;
}

//搜索
export const getSearch = async ({ keyword, page }: SearchOption) => {
  const { list, pagecount } = await request<Detail_Res>(API_URL, {
    ac: "detail",
    pg: page,
    wd: keyword,
  });

  const res = handleResult(list);

  return {
    data: res,
    pageCount: pagecount,
  };
};

//更新选集
export const getDetail = async (ids: string[]) => {
  const res: Detail_Res_List[] = [];

  const _getEpisode = async (page: number = 1) => {
    const { list, pagecount } = await request<Detail_Res>(API_URL, {
      ac: "detail",
      ids: ids.join(","),
      pg: page,
    });

    res.push(...list);

    if (pagecount == page) {
      return;
    }

    _getEpisode(page + 1);
  };

  await _getEpisode();

  return handleResult(res);
};
