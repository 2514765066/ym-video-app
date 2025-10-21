import Icon from "@/components/icon";
import TabBar from "@/components/tab-bar";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <TabBar {...props} />}
    >
      <Tabs.Screen
        name="movie"
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Icon name="filmFill" size={30} />
            ) : (
              <Icon name="film" size={30} />
            ),
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Icon name="historyFill" size={24} />
            ) : (
              <Icon name="history" size={24} />
            ),
        }}
      />
    </Tabs>
  );
}
