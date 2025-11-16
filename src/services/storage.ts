import { createMMKV } from "react-native-mmkv";

type Key = "search-history" | "lastUpdateTime" | "config";

const storage = createMMKV();

const getItem = (key: Key) => {
  return storage.getString(key);
};

const setItem = (key: Key, value: string) => {
  storage.set(key, value);
};

const reset = () => {
  storage.clearAll();
};

export default {
  getItem,
  setItem,
  reset,
};
