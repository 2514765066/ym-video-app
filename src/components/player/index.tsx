import useFullscreen from "@/hooks/useFullscreen";
import { save, saveTime } from "@/store/useHistoryStore";
import { useEffect } from "react";
import { AppState, View } from "react-native";
import Event from "./components/event";
import Tip from "./components/tip";
import Video from "./components/video";
import { showControl } from "./store/useControl";
import Top from "./components/top";
import Bottom from "./components/bottom";
import Rate from "./components/rate";
import List from "./components/list";
import { restoreSystemBrightnessAsync } from "expo-brightness";

export default function () {
  const { enterFullscreen, exitFullscreen } = useFullscreen();

  //初始化
  useEffect(() => {
    //进入全屏
    enterFullscreen();

    //展示控件
    showControl();

    //进入后台保存数据
    const removeChange = AppState.addEventListener("change", state => {
      if (state != "background") {
        return;
      }

      saveTime();

      save();
    });

    return () => {
      //移除监听
      removeChange.remove();

      //还原亮度
      restoreSystemBrightnessAsync();

      exitFullscreen();

      saveTime();

      save();
    };
  }, []);

  return (
    <View className="flex-1 relative bg-black">
      <Tip />

      <Rate />

      <List />

      <Event />

      <Top />

      <Bottom />

      <Video />
    </View>
  );
}
