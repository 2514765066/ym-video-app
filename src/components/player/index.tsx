import useFullscreen from "@/hooks/useFullscreen";
import { historyState, save } from "@/store/useHistoryStore";
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

export default function () {
  const { enterFullscreen, exitFullscreen } = useFullscreen();

  //初始化
  useEffect(() => {
    enterFullscreen();
    showControl();

    historyState.selectedHistory.time = Date.now();

    const removeChange = AppState.addEventListener("change", state => {
      if (state != "background") {
        return;
      }

      save();
    });

    return () => {
      removeChange.remove();

      exitFullscreen();

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
