import { Image, ImageSource } from "expo-image";
import { StyleProp, View, ViewStyle } from "react-native";

type Props = {
  className?: string;
  src: ImageSource | string;
  style?: StyleProp<ViewStyle>;
};

export default function ({ src, className, style }: Props) {
  return (
    <View className={className} style={style}>
      <Image
        contentPosition="left"
        style={{ flex: 1 }}
        source={src}
        placeholder={require("@/assets/images/default.png")}
      />
    </View>
  );
}
