import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Pressable, View } from "react-native";

export default function ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <View
      className="w-screen flex-row justify-evenly items-center bg-bg"
      style={{
        height: 60,
        boxShadow: [
          {
            offsetX: 0,
            offsetY: 0,
            blurRadius: 5,
            spreadDistance: 5,
            color: "rgba(0,0,0,0.1)",
          },
        ],
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        //图标
        const icon = options.tabBarIcon;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable
            key={index}
            className="h-full flex-center aspect-square"
            onPress={onPress}
          >
            {icon &&
              icon({
                focused: isFocused,
                color: "",
                size: 24,
              })}
          </Pressable>
        );
      })}
    </View>
  );
}
