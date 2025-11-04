import { getBrightnessAsync, setBrightnessAsync } from "expo-brightness";
import { proxy } from "valtio";

type BrightnessStore = {
  originBrightness: number;
  brightness: number;
};

export const brightnessStore = proxy<BrightnessStore>({
  originBrightness: 100,
  brightness: 100,
});

export const updateBrightness = (delta: number) => {
  brightnessStore.brightness = Math.min(
    100,
    Math.max(0, brightnessStore.brightness - delta)
  );

  setBrightnessAsync(brightnessStore.brightness / 100);
};

//还原
export const resetBrightness = () => {
  setBrightnessAsync(brightnessStore.originBrightness / 100);
};

//初始化
const init = async () => {
  const brightness = (await getBrightnessAsync()) * 100;

  brightnessStore.brightness = brightness;
  brightnessStore.originBrightness = brightness;
};

init();
