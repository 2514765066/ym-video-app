import {
  historyState,
  nextEpisode,
  preEpisode,
} from "@/stores/useHistoryStore";
import { PropsWithChildren, useMemo } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { useSnapshot } from "valtio";
import Icon from "@/components/icon";
import { pause } from "../../store/usePlay";
import eventEmitter from "@/hooks/eventEmitter";
import { formatRemarks } from "@/utils/format";

export default function () {
  const { selectedHistory } = useSnapshot(historyState);

  return (
    <View className="w-full flex-row justify-between items-center">
      <Text
        className="text-main text-2xl"
        style={{
          textShadowColor: "rgba(0,0,0)",
          textShadowRadius: 2,
        }}
      >
        {selectedHistory.name} ·{" "}
        {formatRemarks(selectedHistory.url[selectedHistory.history]?.label)}
      </Text>

      <RightControls />
    </View>
  );
}

type ButtonProps = {
  onPress?: () => void;
};

function Button({ children, onPress }: PropsWithChildren<ButtonProps>) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className=" w-10 h-10 flex-center rounded-full"
      style={{
        backgroundColor: "rgba(100,100,100,0.8)",
        boxShadow: [
          {
            offsetX: 0,
            offsetY: 1,
            blurRadius: 5,
            spreadDistance: 0,
            color: "rgba(0,0,0,0.5)",
          },
        ],
      }}
    >
      {children}
    </TouchableOpacity>
  );
}

//底部右边控件
function RightControls() {
  const { selectedHistory } = useSnapshot(historyState);

  const visiblePre = useMemo(() => {
    return selectedHistory.history != 0;
  }, [selectedHistory.history, selectedHistory.url]);

  const visibleNext = useMemo(() => {
    return selectedHistory.history != selectedHistory.url.length - 1;
  }, [selectedHistory.history, selectedHistory.url]);

  const handlePre = () => {
    pause();

    preEpisode();
  };

  const handleNext = () => {
    pause();

    nextEpisode();
  };

  const handleRate = () => {
    eventEmitter.emit("player:rate:show");
  };

  const handleList = () => {
    eventEmitter.emit("player:list:show");
  };

  return (
    <View className="flex-row gap-4">
      {visiblePre && (
        <Button onPress={handlePre}>
          <Icon name="next" size={22} className=" rotate-180" />
        </Button>
      )}

      {visibleNext && (
        <Button onPress={handleNext}>
          <Icon name="next" size={22} />
        </Button>
      )}

      <Button onPress={handleRate}>
        <Icon name="rate" size={25} />
      </Button>

      {selectedHistory.url.length > 1 && (
        <Button onPress={handleList}>
          <Icon name="list" size={25} />
        </Button>
      )}
    </View>
  );
}
