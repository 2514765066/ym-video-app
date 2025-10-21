import { proxy } from "valtio";

export const playStore = proxy({
  //播放状态
  isPlay: true,
});

//切换播放状态
export const togglePlay = () => {
  playStore.isPlay = !playStore.isPlay;
};

//暂停
export const pause = () => {
  playStore.isPlay = false;
};

//播放
export const play = () => {
  playStore.isPlay = true;
};
