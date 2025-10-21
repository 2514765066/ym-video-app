import { proxy } from "valtio";

type VolumeStore = {
  volume: number;
};

export const volumeStore = proxy<VolumeStore>({
  volume: 100,
});

export const updateVolume = (delta: number) => {
  volumeStore.volume = Math.min(100, Math.max(0, volumeStore.volume - delta));
};
