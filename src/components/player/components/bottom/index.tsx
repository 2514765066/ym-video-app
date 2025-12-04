import Controls from "./controls";
import Progress from "./progress";
import { View } from "react-native";
import { useSnapshot } from "valtio";
import { progressStore } from "../../store/useProgress";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { controlStore } from "../../store/useControl";
import { useMemo } from "react";

export default function () {
  const { visible } = useSnapshot(controlStore);
  const { seekVisible } = useSnapshot(progressStore);
  const { left, right } = useSafeAreaInsets();

  const padding = Math.max(left, right, 24);

  const { duration, currentTime } = useSnapshot(progressStore);

  //当前播放进度
  const progressWidth = useMemo(() => {
    return (currentTime / duration) * 100 || 0;
  }, [currentTime]);

  return (
    <View
      className="w-full  absolute bottom-0 left-0 z-30"
      style={{
        paddingLeft: padding,
        paddingRight: padding,
      }}
    >
      {visible ? (
        <View className="gap-3">
          {!seekVisible && <Controls />}

          <Progress />
        </View>
      ) : (
        <View
          className="h-0.5 bg-main rounded-full"
          style={{
            width: `${progressWidth}%`,
          }}
        ></View>
      )}
    </View>
  );
}
