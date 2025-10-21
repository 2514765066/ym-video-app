import Controls from "./controls";
import Progress from "./progress";
import { View } from "react-native";
import { useSnapshot } from "valtio";
import { progressStore } from "../../store/useProgress";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { controlStore } from "../../store/useControl";

export default function () {
  const { visible } = useSnapshot(controlStore);
  const { seekVisible } = useSnapshot(progressStore);
  const { left, right } = useSafeAreaInsets();

  const padding = Math.max(left, right, 24);

  return (
    visible && (
      <View
        className="w-full gap-3 absolute bottom-0 left-0 z-30"
        style={{
          paddingLeft: padding,
          paddingRight: padding,
        }}
      >
        {!seekVisible && <Controls />}

        <Progress />
      </View>
    )
  );
}
