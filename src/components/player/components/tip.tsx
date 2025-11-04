import useVisible from "@/hooks/useVisible";
import React, { useEffect, useMemo, useState } from "react";
import { View, Text } from "react-native";
import { useSnapshot } from "valtio";
import { brightnessStore } from "../store/useBrightness";
import { volumeStore } from "../store/useVolume";
import eventEmitter from "@/hooks/eventEmitter";
import Icon from "@/components/icon";
import { rateStore } from "../store/useRate";
import { Loading } from "@/components/loading";
import { videoStore } from "../store/useVideo";

const tpyeMap = {
  volume: <VolumeTip />,
  brightness: <BrightnessTip />,
};

export default function () {
  const { loading } = useSnapshot(videoStore);

  const { visible, show } = useVisible(1000);
  const [type, setType] = useState<keyof typeof tpyeMap>("volume");

  useEffect(() => {
    const handleVolume = eventEmitter.on("player:volume:show", () => {
      setType("volume");

      show();
    });

    const handleBrightness = eventEmitter.on("player:brightness:show", () => {
      setType("brightness");

      show();
    });

    return () => {
      handleVolume.remove();

      handleBrightness.remove();
    };
  }, []);

  return (
    <View className="wh-full flex-center absolute top-0 left-0 z-10 pointer-events-none">
      <RateTip />

      {loading && <Loading />}

      {visible && tpyeMap[type]}
    </View>
  );
}

type BaseTipProps = {
  data: number;
  iconComponent: React.ReactNode;
};

function BaseTip({ data, iconComponent }: BaseTipProps) {
  return (
    <View
      className="w-1/4 flex-row items-center absolute top-4 rounded-2xl overflow-hidden"
      style={{
        backgroundColor: "rgba(110,110,110,0.8)",
        boxShadow: [
          {
            offsetX: 0,
            offsetY: 0,
            blurRadius: 4,
            spreadDistance: 0,
            color: "rgba(0,0,0,0.5)",
          },
        ],
      }}
    >
      <View
        className="h-full absolute left-0 bottom-0 bg-white"
        style={{
          width: `${data}%`,
        }}
      />

      <View className="m-3">{iconComponent}</View>
    </View>
  );
}

function VolumeTip() {
  const { volume } = useSnapshot(volumeStore);

  const getIconName = useMemo(() => {
    if (volume == 0) {
      return "volumeOff";
    }

    if (volume > 0 && volume < 50) {
      return "volume1";
    }

    return "volume2";
  }, [volume]);

  return (
    <BaseTip
      data={volume}
      iconComponent={
        <Icon name={getIconName} size={20} color="#666" strokeWidth={0.5} />
      }
    />
  );
}

function BrightnessTip() {
  const { brightness } = useSnapshot(brightnessStore);

  return (
    <BaseTip
      data={brightness}
      iconComponent={
        <Icon name="brightness" size={20} color="#666" strokeWidth={0.5} />
      }
    />
  );
}

function RateTip() {
  const { rateTip } = useSnapshot(rateStore);

  if (!rateTip) {
    return null;
  }

  return (
    <View
      className="px-4 py-2 absolute top-4 rounded-xl"
      style={{
        backgroundColor: "rgba(25,25,25,0.5)",
      }}
    >
      <Text className="text-main">倍速播放中...</Text>
    </View>
  );
}
