import { View, Text } from "react-native";
import Icon from "./icon";

export default function () {
  return (
    <View className="wh-full flex-center gap-4">
      <Icon name="empty" size={100} color="rgba(255,255,255,0.3)" />

      <Text className="text-main-dark2 text-lg">暂无更多内容...</Text>
    </View>
  );
}
