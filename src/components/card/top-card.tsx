import { MovieInfo } from "@/type";
import { BlurView } from "expo-blur";
import { ImageBackground } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import Img from "../img";
import Icon from "../icon";

import { updateDetail } from "@/store/useDetailStore";
import { formatSub } from "@/utils/format";

type Props = {
  data: MovieInfo;
};

export default function ({ data }: Props) {
  const handlePress = () => {
    updateDetail(data);

    router.push("/details");
  };

  return (
    <Pressable onPress={handlePress}>
      <Base data={data} />
    </Pressable>
  );
}

function Base({ data }: Props) {
  return (
    <View
      className="rounded-xl overflow-hidden aspect-3/2"
      style={{
        boxShadow: [
          {
            offsetX: 0,
            offsetY: 1,
            blurRadius: 4,
            spreadDistance: 0,
            color: "rgba(0,0,0,0.2)",
          },
        ],
      }}
    >
      <ImageBackground
        source={data.pic}
        style={{
          flex: 1,
        }}
        placeholder={require("@/assets/images/default.png")}
      >
        <BlurView
          tint="dark"
          intensity={100}
          experimentalBlurMethod="dimezisBlurView"
          className="flex-1 flex-row"
        >
          {/* 信息块 */}
          <View className="flex-1 p-5 pr-1 gap-4">
            <View className="flex-row items-center gap-1.5  ">
              <Icon name="video" size={16} color="rgba(255,255,255,0.6)" />

              <Text className="text-sm text-main-dark1">推荐</Text>
            </View>

            <Text
              numberOfLines={1}
              className="text-3xl font-bold text-main tracking-wide "
            >
              {data.name}
            </Text>

            <Text
              numberOfLines={3}
              className="text-main-dark1 leading-6 text-lg  tracking-wide"
            >
              {data.sub || "暂无剧情简介......"}
            </Text>

            <View className="mt-auto flex-row flex-wrap items-center gap-2">
              <Text className="text-main-dark1">{formatSub(data.year)}</Text>

              <Text className="text-main-dark2">|</Text>

              <Text className="text-main-dark1">{formatSub(data.area)}</Text>

              <Text className="text-main-dark2">|</Text>

              <Text className="text-main-dark1">{formatSub(data.lang)}</Text>
            </View>
          </View>

          {/* 海报封面 */}
          <View className="flex-1 p-4">
            <Img src={data.pic} className="flex-1 rounded-xl overflow-hidden" />
          </View>
        </BlurView>
      </ImageBackground>
    </View>
  );
}
