import useVisible from "@/hooks/useVisible";
import React, { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { useSnapshot } from "valtio";
import { brightnessStore } from "../store/useBrightness";
import { volumeStore } from "../store/useVolume";
import eventEmitter from "@/hooks/eventEmitter";
import Icon from "@/components/icon";

const tpyeMap = {
  volume: <VolumeTip />,
  brightness: <BrightnessTip />,
};

export default function () {
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

  if (!visible) {
    return null;
  }

  return (
    <View className="wh-full pt-4 items-center absolute top-0 left-0 z-10">
      {tpyeMap[type]}
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
      className="w-1/4 flex-row items-center rounded-2xl overflow-hidden"
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
