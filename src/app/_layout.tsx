import "@/global.css";
import Icon from "@/components/icon";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { View, Text } from "react-native";
import { SystemBars } from "react-native-edge-to-edge";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useNetworkState } from "expo-network";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

export const unstable_settings = {
  anchor: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const networkState = useNetworkState();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  if (networkState.isInternetReachable === false) {
    return <OffLineTip />;
  }

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <SafeAreaProvider>
          <KeyboardProvider>
            <SystemBars
              style="light"
              hidden={{
                statusBar: false,
                navigationBar: false,
              }}
            />

            <Stack
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="(tabs)" />

              <Stack.Screen name="details" />

              <Stack.Screen name="search" />

              <Stack.Screen name="player" />
            </Stack>
          </KeyboardProvider>
        </SafeAreaProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

function OffLineTip() {
  return (
    <View className="flex-1 flex-center bg-bg">
      <View className="w-full items-center">
        <Icon name="offline" size={150} color="rgba(255,255,255,0.3)" />

        <Text className="text-main-dark2 text-xl text-center">
          哎呀，你好像没网了~
        </Text>
      </View>
    </View>
  );
}
