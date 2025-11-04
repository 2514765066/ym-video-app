import usePanGesure from "@/hooks/usePanGesure";
import { Dimensions, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { updateBrightness } from "../store/useBrightness";
import { toggleControl } from "../store/useControl";
import { pause, play, playStore, togglePlay } from "../store/usePlay";
import {
  hideSeek,
  progressStore,
  seekTo,
  showSeek,
  updateSeek,
} from "../store/useProgress";
import { useRate } from "../store/useRate";
import { updateVolume } from "../store/useVolume";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSnapshot } from "valtio";
import Icon from "@/components/icon";
import eventEmitter from "@/hooks/eventEmitter";
import { videoStore } from "../store/useVideo";

const { width } = Dimensions.get("window");

export default function () {
  const { left, right } = useSafeAreaInsets();
  const { seekRatio, duration } = useSnapshot(progressStore);
  const { openRate, resetRate } = useRate();

  //单击手势
  const singleTap = Gesture.Tap().runOnJS(true).onStart(toggleControl);

  //双击手势
  const doubleTap = Gesture.Tap()
    .runOnJS(true)
    .numberOfTaps(2)
    .onStart(togglePlay);

  //长按手势
  const longPress = Gesture.LongPress()
    .runOnJS(true)
    .onStart(openRate)
    .onEnd(resetRate);

  //滑动手势 进度
  const panProgres = Gesture.Pan()
    .runOnJS(true)
    .activeOffsetX([-10, 10])
    .activeOffsetY([-1000, 1000])
    .onStart(() => {
      pause();
    })
    .onUpdate(e => {
      const ratio = e.translationX / (width - Math.max(left, right) * 2);
      updateSeek(ratio);
      showSeek();
    })
    .onEnd(() => {
      seekTo(duration * seekRatio);
      hideSeek();
      play();
    });

  //滑动手势 音量
  const panVolume = usePanGesure(e => {
    updateVolume(e.deltaY);

    eventEmitter.emit("player:volume:show");
  }, "vertical");

  //滑动手势 亮度
  const panBright = usePanGesure(e => {
    updateBrightness(e.deltaY);

    eventEmitter.emit("player:brightness:show");
  }, "vertical");

  //容器手势
  const containerGesture = Gesture.Exclusive(panProgres, doubleTap, singleTap);

  //左元素手势
  const leftGesture = Gesture.Exclusive(longPress, panBright);

  //右元素手势
  const rightGesture = Gesture.Exclusive(longPress, panVolume);

  return (
    <GestureDetector gesture={containerGesture}>
      <View className="wh-full flex-row justify-between items-center absolute top-0 left-0 z-10">
        {/* 三倍速 和 亮度 */}
        <GestureDetector gesture={leftGesture}>
          <View className=" w-1/4 h-1/3" />
        </GestureDetector>

        <PlayTip />

        {/* 三倍速 和 声音*/}
        <GestureDetector gesture={rightGesture}>
          <View className="w-1/4 h-1/3" />
        </GestureDetector>
      </View>
    </GestureDetector>
  );
}

function PlayTip() {
  const { isPlay } = useSnapshot(playStore);
  const { loading } = useSnapshot(videoStore);

  const tap = Gesture.Tap().runOnJS(true).onStart(play);

  if (isPlay || loading) {
    return null;
  }

  return (
    <GestureDetector gesture={tap}>
      <Icon
        name="playFill"
        size={80}
        stroke="rgba(0,0,0,0.02)"
        strokeWidth={0.5}
      />
    </GestureDetector>
  );
}
