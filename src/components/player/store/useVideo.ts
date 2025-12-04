import { useSharedValue } from "react-native-reanimated";
import { proxy } from "valtio";

export const scaleSharedValue = useSharedValue(1);

export const videoStore = proxy({
  loading: false,
  scale: 1,
});

export const setLoading = (value: boolean) => {
  videoStore.loading = value;
};

export const setScale = (scale: number) => {
  videoStore.scale = scale;
};

export const resetScale = () => {
  videoStore.scale = 1;
  scaleSharedValue.value = 1;
};
