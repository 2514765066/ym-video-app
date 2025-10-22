import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import { View, Text, Pressable } from "react-native";

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <View className="w-screen flex-center absolute left-0 bottom-2">
      <View
        className="rounded-full overflow-hidden"
        style={{
          boxShadow: [
            {
              offsetX: 0,
              offsetY: 2,
              blurRadius: 8,
              spreadDistance: 1,
              color: "rgba(0,0,0,0.4)",
            },
          ],
        }}
      >
        <BlurView
          intensity={100}
          tint="dark"
          experimentalBlurMethod="dimezisBlurView"
          className="p-1.5 flex-row"
          style={{
            backgroundColor: "rgba(255,255,255,0.1)",
          }}
        >
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];

            //图标
            const icon = options.tabBarIcon!;

            //标题
            const label = options.tabBarLabel as string;

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
                className="flex-row flex-center gap-1 rounded-full"
                style={{
                  width: 98,
                  height: 44,
                  backgroundColor: isFocused
                    ? "rgba(255,255,255,0.05)"
                    : "transparent",
                }}
                onPress={onPress}
              >
                {icon({
                  focused: isFocused,
                  color: "",
                  size: 24,
                })}

                {isFocused && (
                  <Text
                    className={`${isFocused ? "text-main" : " text-main-dark2"}`}
                  >
                    {label}
                  </Text>
                )}
              </Pressable>
            );
          })}
        </BlurView>
      </View>
    </View>
  );
}
