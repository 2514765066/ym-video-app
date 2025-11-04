import { proxy } from "valtio";

export const videoStore = proxy({
  loading: false,
});

export const updateLoading = (value: boolean) => {
  videoStore.loading = value;
};
