import { BlurView } from "expo-blur";
import { router } from "expo-router";
import { ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "./icon";

type Props = {
  title?: string;
  titleShow?: boolean;
  titleComponent?: ReactNode;

  leftShow?: boolean;
  leftComponent?: ReactNode;

  rightShow?: boolean;
  rightComponent?: ReactNode;

  blur?: boolean;
  bg?: boolean;
};

export default function ({
  title,
  titleShow = true,
  titleComponent,

  leftShow = true,
  leftComponent,

  rightShow = true,
  rightComponent,

  blur = true,
  bg = true,
}: Props) {
  const { top } = useSafeAreaInsets();

  return (
    <BlurView
      tint="dark"
      intensity={blur ? 50 : 0}
      experimentalBlurMethod="dimezisBlurView"
      className="w-screen flex-row flex-center absolute top-0 left-0 z-10"
      style={{
        paddingTop: top,
        height: 44 + top,
        backgroundColor: bg ? "rgba(25,25,25,0.5)" : "transparent",
      }}
    >
      {leftShow && (
        <View className="h-full flex-row flex-center absolute left-4 bottom-0">
          {leftComponent}
        </View>
      )}

      {titleShow && (
        <View className="h-full flex-row flex-center">
          {titleComponent ? (
            titleComponent
          ) : (
            <Text className="text-main text-xl">{title}</Text>
          )}
        </View>
      )}

      {rightShow && (
        <View className="h-full flex-row flex-center absolute right-4 bottom-0">
          {rightComponent}
        </View>
      )}
    </BlurView>
  );
}

type BackProps = {
  blur?: boolean;
};

export function BackControl({ blur }: BackProps) {
  const onPress = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <TouchableOpacity
      className="w-10 h-10 rounded-full border-main-dark3 overflow-hidden"
      style={{
        borderWidth: blur ? 1 : 0,
      }}
      onPress={onPress}
    >
      <BlurView
        tint="dark"
        intensity={blur ? 80 : 0}
        experimentalBlurMethod="dimezisBlurView"
        className="flex-1 flex-center"
      >
        <Icon
          name="back"
          size={18}
          strokeWidth={0.5}
          className="translate-x-1/6"
          style={{
            transform: [
              {
                translateX: "14%",
              },
            ],
          }}
        />
      </BlurView>
    </TouchableOpacity>
  );
}
