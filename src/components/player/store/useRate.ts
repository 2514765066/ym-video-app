import { proxy } from "valtio";

export const rateList = [
  {
    label: "4.0x",
    value: 4,
  },
  {
    label: "3.0x",
    value: 3,
  },
  {
    label: "2.0x",
    value: 2,
  },
  {
    label: "1.0x",
    value: 1,
  },
  {
    label: "0.75x",
    value: 0.75,
  },
  {
    label: "0.5x",
    value: 0.5,
  },
  {
    label: "0.25x",
    value: 0.25,
  },
];

export const rateStore = proxy({
  //原始倍速
  originalRate: 1,

  //当前倍速
  rate: 1,

  //倍速提示
  rateTip: false,
});

//设置倍速
export const setRate = (value: number) => {
  rateStore.rate = value;
};

//开启倍速
let isOpen = false;
export const openRate = () => {
  if (rateStore.rate >= 3) {
    isOpen = false;
    return;
  }

  isOpen = true;

  rateStore.originalRate = rateStore.rate;

  rateStore.rate = 3.0;
  rateStore.rateTip = true;
};

//重置倍速
export const resetRate = () => {
  if (!isOpen) {
    return;
  }

  isOpen = false;

  rateStore.rate = rateStore.originalRate;
  rateStore.rateTip = false;
};
