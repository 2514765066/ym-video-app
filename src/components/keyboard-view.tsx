import { PropsWithChildren } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { KeyboardStickyView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSegments } from "expo-router";

type Props = {
  className?: string;
  style?: StyleProp<ViewStyle>;
  closed?: number;
  opened?: number;
};

export default function KeyboardView({
  className,
  children,
  style,
  closed = 0,
  opened = 0,
}: PropsWithChildren<Props>) {
  const { bottom } = useSafeAreaInsets();
  const segments = useSegments();

  return (
    <KeyboardStickyView
      className={className}
      offset={{
        closed,
        opened: segments[0] == "(tabs)" ? 56 : 0 + bottom + opened,
      }}
      style={style}
    >
      {children}
    </KeyboardStickyView>
  );
}
