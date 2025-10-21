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
  rate: 1,
});

export const updateRate = (value: number) => {
  rateStore.rate = value;
};

//使用倍速
export const useRate = () => {
  //原始倍速
  let originalRate = 1.0;

  //开启倍速
  const openRate = () => {
    originalRate = rateStore.rate;

    rateStore.rate = 3.0;
  };

  //重置倍速
  const resetRate = () => {
    rateStore.rate = originalRate;
  };

  return {
    openRate,
    resetRate,
  };
};
