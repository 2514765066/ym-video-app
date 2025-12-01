import { setBrightnessAsync } from "expo-brightness";
import { proxy } from "valtio";

export const brightnessStore = proxy({
  brightness: 50,
});

export const setBrightness = (delta: number) => {
  brightnessStore.brightness = Math.min(
    100,
    Math.max(0, brightnessStore.brightness - delta)
  );

  setBrightnessAsync(brightnessStore.brightness / 100);
};
