import { PropsWithChildren } from "react";
import { View } from "react-native";
import { Svg } from "react-native-svg";

export type Props = {
  size?: number | string;
  color?: string;
  className?: string;
  strokeWidth?: number;
};

export default function ({
  size = 30,
  color = "#ffffffcf",
  children,
  className,
  strokeWidth = 0,
}: PropsWithChildren<Props>) {
  return (
    <View className={className}>
      <Svg
        width={size}
        height={size}
        viewBox="0 0 20 20"
        fill={color}
        stroke={color}
        strokeWidth={strokeWidth}
      >
        {children}
      </Svg>
    </View>
  );
}
