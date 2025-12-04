import { Dimensions, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { setBrightness } from "../store/useBrightness";
import { toggleControl } from "../store/useControl";
import { pause, play, togglePlay } from "../store/usePlay";
import {
  hideSeek,
  progressStore,
  seekTo,
  showSeek,
  setSeek,
} from "../store/useProgress";
import { openRate, resetRate } from "../store/useRate";
import { setVolume } from "../store/useVolume";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSnapshot } from "valtio";
import eventEmitter from "@/hooks/eventEmitter";
import {
  useDeltaPan,
  useDoubleTap,
  useLongPress,
  usePan,
  usePinch,
  useTap,
} from "@/hooks/useGesure";
import { useSharedValue } from "react-native-reanimated";
import { scaleSharedValue, setScale } from "../store/useVideo";

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
      setSeek(ratio);
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
      setVolume(deltaY);

      eventEmitter.emit("player:volume:show");
    },
    {
      direction: "vertical",
    }
  );

  //滑动手势 亮度
  const panBright = useDeltaPan(
    ({ deltaY }) => {
      setBrightness(deltaY);

      eventEmitter.emit("player:brightness:show");
    },
    {
      direction: "vertical",
    }
  );

  const startScale = useSharedValue(0);
  const pinchScale = usePinch()
    .onStart(() => {
      startScale.value = scaleSharedValue.value;
    })
    .onUpdate(e => {
      scaleSharedValue.value = startScale.value * e.scale;
    })
    .onEnd(e => {
      setScale(startScale.value * e.scale);
    });

  //容器手势
  const containerGesture = Gesture.Exclusive(
    longPress,
    panProgres,
    pinchScale,
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
