import { getUpdate } from "@/services/api";
import * as db from "@/services/db";
import { HistoryInfo, Progress } from "@/type";
import { proxy } from "valtio";
import { proxyMap } from "valtio/utils";
import { getSource } from "./useSourceStore";

type HistoryStore = {
  data: Map<string, HistoryInfo>;

  selectedID: string;

  selectedHistory: HistoryInfo;

  selectedProgress: Progress;
};

//数据
export const historyState = proxy<HistoryStore>({
  data: proxyMap(),

  //选中的历史记录名称
  selectedID: "",

  //选中的历史记录
  get selectedHistory() {
    return (
      this.data.get(this.selectedID) || {
        name: "",
        history: 0,
        pic: "",
        content: "",
        year: "",
        area: "",
        lang: "",
        type: "",
        time: 0,
        id: "",
        url: [],
        remarks: "",
        progress: [],
      }
    );
  },

  get selectedProgress() {
    return this.selectedHistory.progress[this.selectedHistory.history];
  },

  set selectedProgress(val: Progress) {
    this.selectedHistory.progress[this.selectedHistory.history] = val;
  },
});

// 添加历史记录
export const add = (option: HistoryInfo) => {
  if (historyState.data.has(option.id)) {
    historyState.data.get(option.id)!.history = option.history;
    return;
  }

  const data: HistoryInfo = {
    ...option,
    time: Date.now(),
  };

  historyState.data.set(option.id, data);

  db.insert(data);
};

//判断是否存在
export const has = (id: string) => {
  return historyState.data.has(id);
};

//移除历史记录
export const remove = async (id: string) => {
  if (!has(id)) {
    return;
  }

  historyState.data.delete(id);

  db.remove(id);
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

  if (currentTime && currentTime > 1) {
    historyState.selectedProgress.currentTime = currentTime;
  }

  if (duration && duration > 1) {
    historyState.selectedProgress.duration = duration;
  }
};

//更新最新时间
export const saveTime = () => {
  historyState.selectedHistory.time = Date.now();
};

//保存数据
export const save = () => {
  db.update(historyState.selectedHistory);
};

//更新集数
const update = async (data: Map<string, HistoryInfo>) => {
  if (data.size == 0) return;

  const group = new Map<string, string[]>();

  data.forEach(item => {
    if (!item.remarks.includes("更新")) {
      return;
    }

    if (!group.has(item.source)) {
      group.set(item.source, []);
    }

    group.get(item.source)!.push(item.id);
  });

  if (group.size == 0) return;

  const results = await Promise.all(
    Array.from(group.entries()).map(([sourceName, ids]) =>
      getUpdate(getSource(sourceName), ids)
    )
  );

  for (const detailMap of results) {
    for (const item of detailMap) {
      const old = data.get(item.id);
      if (old) data.set(item.id, { ...old, ...item });
    }
  }
};

//初始化
const init = async () => {
  const res = new Map(await db.select());

  if (res.size == 0) {
    return;
  }

  await update(res);

  historyState.data = proxyMap(res);
};

init();
