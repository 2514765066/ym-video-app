import { proxy } from "valtio";

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
