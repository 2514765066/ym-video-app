import { BlurView } from "expo-blur";
import { router } from "expo-router";
import { ReactNode } from "react";
import {
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
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

  style?: StyleProp<ViewStyle>;
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
}: Props) {
  const { top } = useSafeAreaInsets();

  return (
    <BlurView
      tint="dark"
      intensity={blur ? 100 : 0}
      experimentalBlurMethod="dimezisBlurView"
      className={`w-screen flex-row flex-center absolute top-0 left-0 z-10 `}
      style={[
        {
          paddingTop: top,
          height: 44 + top,
          backgroundColor: blur ? "rgba(255,255,255,0.05)" : "transparent",
        },
      ]}
    >
      {leftShow && (
        <View className="h-full flex-row flex-center aspect-square">
          {leftComponent}
        </View>
      )}

      {titleShow && (
        <View className="h-full flex-row flex-center flex-1">
          {titleComponent ? (
            titleComponent
          ) : (
            <Text className="text-main text-xl">{title}</Text>
          )}
        </View>
      )}

      {rightShow && (
        <View className="h-full flex-row flex-center aspect-square">
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
