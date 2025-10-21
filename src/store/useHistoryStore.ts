import { getDetail } from "@/services/api";
import * as db from "@/services/db";
import { HistoryInfo, Progress } from "@/type";
import { proxy } from "valtio";
import { subscribeKey } from "valtio/utils";

type HistoryStore = {
  data: HistoryInfo[];

  selectedID: string;

  selectedHistory: HistoryInfo;

  selectedProgress: Progress;
};

//数据
export const historyState = proxy<HistoryStore>({
  data: [],

  //选中的历史记录名称
  selectedID: "",

  selectedHistory: {
    name: "",
    history: 0,
    pic: "",
    sub: "",
    year: "",
    area: "",
    lang: "",
    type: "",
    time: 0,
    id: "",
    url: [],
    remarks: "",
    progress: [],
  },

  get selectedProgress() {
    return this.selectedHistory.progress[this.selectedHistory.history];
  },

  set selectedProgress(val: Progress) {
    this.selectedHistory.progress[this.selectedHistory.history] = val;
  },
});

subscribeKey(historyState, "selectedID", value => {
  const res = historyState.data.find(item => item.id == value);

  if (!res) return;

  historyState.selectedHistory = res;
});

// 判断是否存在
export const has = (name: string) => {
  return historyState.data.some(item => item.name == name);
};

// 添加历史记录
export const add = (option: HistoryInfo) => {
  if (has(option.name)) {
    return;
  }

  const data: HistoryInfo = {
    ...option,
    time: Date.now(),
  };

  historyState.data.push(data);

  db.insert(data);
};

//移除历史记录
export const remove = async (id: string) => {
  const index = historyState.data.findIndex(item => item.id == id);

  await db.remove(id);

  historyState.data.splice(index, 1);
};

// 播放
export const select = (id: string) => {
  historyState.selectedID = id;
};

//上一集
export const preEpisode = () => {
  historyState.selectedHistory.history--;
};

//下一集
export const nextEpisode = () => {
  historyState.selectedHistory.history++;
};

//更新进度
interface UpdateProgressOption {
  currentTime?: number;
  duration?: number;
}

export const updateProgress = ({
  currentTime,
  duration,
}: UpdateProgressOption) => {
  if (!historyState.selectedProgress) {
    historyState.selectedProgress = { currentTime: 0, duration: 0 };
  }

  if (currentTime) {
    historyState.selectedProgress.currentTime = currentTime;
  }

  if (duration) {
    historyState.selectedProgress.duration = duration;
  }
};

//保存数据
export const save = () => {
  db.update(historyState.selectedHistory);
};

//初始化
const init = async () => {
  //需要优化
  const res = await db.select();

  const shouldUpdate = res
    .filter(item => item.remarks.includes("更新"))
    .map((item, index) => ({
      index,
      id: item.id,
    }));

  const detailData = await getDetail(shouldUpdate.map(item => item.id));

  shouldUpdate.forEach(({ index }, i) => {
    res[index].url = detailData[i].url;
  });

  historyState.data = res;
};

init();
