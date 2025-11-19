import { Dimensions, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { updateBrightness } from "../store/useBrightness";
import { toggleControl } from "../store/useControl";
import { pause, play, togglePlay } from "../store/usePlay";
import {
  hideSeek,
  progressStore,
  seekTo,
  showSeek,
  updateSeek,
} from "../store/useProgress";
import { openRate, resetRate } from "../store/useRate";
import { updateVolume } from "../store/useVolume";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSnapshot } from "valtio";
import eventEmitter from "@/hooks/eventEmitter";
import {
  useDeltaPan,
  useDoubleTap,
  useLongPress,
  usePan,
  useTap,
} from "@/hooks/usePanGesure";

const { width } = Dimensions.get("window");

export default function () {
  const { left, right } = useSafeAreaInsets();
  const { seekRatio, duration } = useSnapshot(progressStore);

  //单击手势
  const singleTap = useTap().onStart(toggleControl);

  //双击手势
  const doubleTap = useDoubleTap().onStart(togglePlay);

  //长按手势
  const longPress = useLongPress().onStart(openRate).onEnd(resetRate);

  //滑动手势 进度
  const panProgres = usePan({
    direction: "horizontal",
    disable: duration == 0,
  })
    .onStart(pause)
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
  const panVolume = useDeltaPan(
    ({ deltaY }) => {
      updateVolume(deltaY);

      eventEmitter.emit("player:volume:show");
    },
    {
      direction: "vertical",
    }
  );

  //滑动手势 亮度
  const panBright = useDeltaPan(
    ({ deltaY }) => {
      updateBrightness(deltaY);

      eventEmitter.emit("player:brightness:show");
    },
    {
      direction: "vertical",
    }
  );

  //容器手势
  const containerGesture = Gesture.Exclusive(
    longPress,
    panProgres,
    doubleTap,
    singleTap
  );

  return (
    <View
      className="flex-center absolute inset-0 z-10"
      style={{
        paddingHorizontal: Math.max(left, right),
      }}
    >
      <GestureDetector gesture={containerGesture}>
        <View className="w-full h-3/4 flex-row justify-between items-center ">
          {/* 三倍速 和 亮度 */}
          <GestureDetector gesture={panBright}>
            <View className="flex-1 h-full " />
          </GestureDetector>

          {/* 三倍速 和 声音*/}
          <GestureDetector gesture={panVolume}>
            <View className="flex-1 h-full " />
          </GestureDetector>
        </View>
      </GestureDetector>
    </View>
  );
}
