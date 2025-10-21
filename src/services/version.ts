import { nativeApplicationVersion } from "expo-application";

//格式化版本
const formatVersion = (version: string) => {
  const [major, minor, patch] = version.split(".").map(Number);

  return major * 10000 + minor * 100 + patch;
};

//使用最小的版本
export const minVersion = formatVersion("1.0.0");

//当前版本
export const version = formatVersion(nativeApplicationVersion as string);
