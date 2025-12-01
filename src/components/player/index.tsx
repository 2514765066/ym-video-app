import useFullscreen from "@/hooks/useFullscreen";
import { save, saveTime } from "@/stores/useHistoryStore";
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
import { resetProgress } from "./store/useProgress";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { usePinch } from "@/hooks/useGesure";
import { setScale, videoStore } from "./store/useVideo";
import { subscribeKey } from "valtio/utils";

export default function () {
  const { enterFullscreen, exitFullscreen } = useFullscreen();

  //缩放
  const scale = useSharedValue(1);

  //开始缩放
  const startScale = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const pinchScale = usePinch()
    .onStart(() => {
      startScale.value = scale.value;
    })
    .onUpdate(e => {
      scale.value = startScale.value * e.scale;
    })
    .onEnd(e => {
      setScale(startScale.value * e.scale);
    });

  subscribeKey(videoStore, "scale", val => {
    if (val == 1) {
      scale.value = 1;
    }
  });

  //初始化
  useEffect(() => {
    //清空进度条
    resetProgress();

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
    <View className="flex-1 flex-center relative bg-black">
      <List />

      <Rate />

      <Top />

      <Bottom />

      <Tip />

      <Event pinchScale={pinchScale} />

      <Animated.View className="wh-full" style={animatedStyles}>
        <Video />
      </Animated.View>
    </View>
  );
}
