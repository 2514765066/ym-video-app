import { proxy } from "valtio";
import { videoRef } from "./useEl";

export const progressStore = proxy({
  currentTime: 0,
  duration: 0,

  seekRatio: 0,
  seekVisible: false,
});

//重置播放进度
export const resetProgress = () => {
  progressStore.currentTime = 0;
  progressStore.duration = 0;
};

//显示进度条提示
export const showSeek = () => {
  progressStore.seekVisible = true;
};

//隐藏进度条提示
export const hideSeek = () => {
  progressStore.seekVisible = false;
};

//更新播放进度
export const updateSeek = (ratio: number) => {
  const currentRatio = progressStore.currentTime / progressStore.duration;

  const newRatio = currentRatio + ratio / 4;

  progressStore.seekRatio = Math.max(0, Math.min(1, newRatio));
};

//跳转到
export const seekTo = (seconde: number) => {
  progressStore.currentTime = seconde;

  videoRef.current?.seek(seconde);
};
