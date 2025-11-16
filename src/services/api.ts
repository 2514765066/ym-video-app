import { configState } from "@/store/useConfigStore";
import {
  Detail_Res_List,
  Detail_Res,
  MovieInfo,
  List_Res,
  Category,
  UpdateInfo,
} from "@/type";
import { formatContent, formatRemarks } from "@/utils/format";
import { request } from "@/utils/request";

//处理播放url
const handlePlayUrl = (playUrl: string, playNote: string) => {
  let urls = playUrl;

  if (playNote) {
    urls = playUrl.split(playNote).filter(item => item.includes("m3u8"))[0];
  }

  return urls
    .split("#")
    .filter(item => item.endsWith(".m3u8"))
    .map((item, index) => {
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

//处理返回结果
const handleDetail = (data: Detail_Res_List[]): MovieInfo[] => {
  return data.map(item => ({
    name: item.vod_name,
    content: formatContent(item.vod_content),
    id: `${configState.selectedSource.label},${item.vod_id}`,
    pic: item.vod_pic,
    year: item.vod_year,
    area: item.vod_area,
    lang: item.vod_lang,
    type: item.type_name,
    url: handlePlayUrl(item.vod_play_url, item.vod_play_note),
    remarks: item.vod_remarks,
    source: {
      url: configState.selectedSource.url,
      label: configState.selectedSource.label,
    },
  }));
};

//处理返回结果
const handleUpdate = (data: Detail_Res_List[]): UpdateInfo[] => {
  return data.map(item => ({
    id: `${configState.selectedSource.label},${item.vod_id}`,
    remarks: item.vod_remarks,
    url: handlePlayUrl(
      item.vod_play_url,

      item.vod_play_note
    ),
  }));
};

interface RecommendOption {
  tid: string | number;
  page?: number;
}

//获取影视
export const getMovie = async ({ tid, page = 1 }: RecommendOption) => {
  //获取基本信息
  const { list, pagecount } = await request<Detail_Res>({
    query: {
      ac: "detail",
      t: tid,
      pg: page,
    },
  });

  return {
    data: handleDetail(list),
    pageCount: pagecount,
  };
};

interface SearchOption {
  keyword: string;
  page?: number;
}

//搜索
export const getSearch = async ({ keyword, page }: SearchOption) => {
  const { list, pagecount } = await request<Detail_Res>({
    query: {
      ac: "detail",
      pg: page,
      wd: keyword,
    },
  });

  const res = handleDetail(list);

  return {
    data: res,
    pageCount: pagecount,
  };
};

//获取更新状态
export const getUpdate = async (source: string, ids: string[]) => {
  const res: Detail_Res_List[] = [];

  const _getEpisode = async (page: number = 1) => {
    const { list, pagecount } = await request<Detail_Res>({
      url: source,
      query: {
        ac: "detail",
        ids: ids.join(","),
        pg: page,
      },
    });

    res.push(...list);

    if (pagecount == page) {
      return;
    }

    _getEpisode(page + 1);
  };

  await _getEpisode();

  return handleUpdate(res);
};

//获取分类
export const getCategory = async (url?: string) => {
  const res = await request<List_Res>({ url });

  const category = new Map<number, Category>();

  const childCategory = new Map<number, Category[]>();

  for (const item of res.class) {
    //分类
    if (item.type_pid == 0) {
      category.set(item.type_id, {
        label: item.type_name,
        id: item.type_id,
      });
    }

    if (!childCategory.has(item.type_pid)) {
      childCategory.set(item.type_pid, []);
    }

    childCategory.get(item.type_pid)!.push({
      label: item.type_name,
      id: item.type_id,
    });
  }

  return {
    firstID: res.class[0].type_id,
    category,
    childCategory,
  };
};

//获取最近更新
export const getLast = async () => {
  //获取基本信息
  const { list } = await request<Detail_Res>({
    query: {
      ac: "detail",
    },
  });

  return handleDetail(list);
};
