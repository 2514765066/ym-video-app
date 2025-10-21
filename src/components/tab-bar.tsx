import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { PropsWithChildren } from "react";
import { TouchableHighlight, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { bottom } = useSafeAreaInsets();

  return (
    <View
      className="bg-bg"
      style={{
        paddingBottom: bottom,
      }}
    >
      <View className="h-16 py-1 flex-row justify-around items-center">
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const Icon = options.tabBarIcon;
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
            <Item key={index} onPress={onPress}>
              <View>
                {Icon &&
                  Icon({
                    focused: isFocused,
                    color: "",
                    size: 24,
                  })}
              </View>
            </Item>
          );
        })}
      </View>
    </View>
  );
}

type Props = {
  onPress: () => void;
};

function Item({ children, onPress }: PropsWithChildren<Props>) {
  return (
    <TouchableHighlight
      className="h-full flex-center rounded-full aspect-square"
      underlayColor="#2D2D2D"
      onPress={onPress}
    >
      {children}
    </TouchableHighlight>
  );
}
