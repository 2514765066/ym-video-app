import * as Updates from "expo-updates";
import { Alert } from "react-native";

export const checkForUpdate = async () => {
  try {
    const update = await Updates.checkForUpdateAsync();

    if (!update.isAvailable) {
      return;
    }

    const confirmed = await new Promise(resolve =>
      Alert.alert("更新可用", "发现新版本，是否立即更新？", [
        { text: "取消", onPress: () => resolve(false) },
        { text: "更新", onPress: () => resolve(true) },
      ])
    );

    if (confirmed) {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    }
  } catch (e) {
    console.error(e);
  }
};
