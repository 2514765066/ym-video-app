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
        name="index"
        options={{
          tabBarLabel: "影视",
          tabBarIcon: ({ focused }) => (
            <Icon
              name="film"
              size={32}
              color={
                focused ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.3)"
              }
            />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          tabBarLabel: "搜索",
          tabBarIcon: ({ focused }) => (
            <Icon
              name="search"
              size={32}
              color={
                focused ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.3)"
              }
            />
          ),
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          tabBarLabel: "历史",
          tabBarIcon: ({ focused }) => (
            <Icon
              name="history"
              size={28}
              color={
                focused ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.3)"
              }
            />
          ),
        }}
      />
    </Tabs>
  );
}
