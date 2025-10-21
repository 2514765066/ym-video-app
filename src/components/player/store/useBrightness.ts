import eventEmitter from "@/hooks/eventEmitter";
import { getBrightnessAsync, setBrightnessAsync } from "expo-brightness";
import { proxy } from "valtio";

type BrightnessStore = {
  brightness: number;
};

export const brightnessStore = proxy<BrightnessStore>({
  brightness: 100,
});

export const updateBrightness = (delta: number) => {
  brightnessStore.brightness = Math.min(
    100,
    Math.max(0, brightnessStore.brightness - delta)
  );

  setBrightnessAsync(brightnessStore.brightness / 100);

  eventEmitter.emit(
    "tip:show",
    `亮度：${Math.floor(brightnessStore.brightness)}`
  );
};

//初始化
const init = async () => {
  brightnessStore.brightness = (await getBrightnessAsync()) * 100;
};

init();
