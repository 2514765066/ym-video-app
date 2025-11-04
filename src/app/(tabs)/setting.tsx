import Img from "@/components/img";
import TitleBar from "@/components/title-bar";
import { View, ImageBackground, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { router } from "expo-router";
import { Group, GroupItem } from "@/components/setting-group";
import { useSnapshot } from "valtio";
import { useState } from "react";
import { appVersion } from "@/services/info";
import { checkUpdate, download, updateState } from "@/store/useUpdateStore";
import { getTimeDiffLabel } from "@/utils/time";
import { configState } from "@/store/useConfigStore";

export default function () {
  return (
    <View className="flex-1 bg-bg">
      <TitleBar title="设置" />

      <ScrollView
        contentContainerClassName="p-4 gap-4"
        showsVerticalScrollIndicator={false}
      >
        <UpdateProgress />

        <Header />

        <Group data={[<SourceOption />, <GeneralOption />]} />

        <Group data={[<UpdateOption />, <AboutOption />]} />
      </ScrollView>
    </View>
  );
}

function Header() {
  return (
    <ImageBackground
      source={require("@/assets/images/bg.png")}
      className="flex-center relative bg-222 rounded-xl aspect-video overflow-hidden"
    >
      <Img
        src={require("@/assets/images/font.png")}
        style={{
          width: 200,
          aspectRatio: 25 / 8,
        }}
      />
    </ImageBackground>
  );
}

function SourceOption() {
  const { sourceName } = useSnapshot(configState);

  return (
    <GroupItem
      label="播放源"
      icon="source"
      sub={sourceName}
      onPress={() => router.push("/settings/source")}
      rightVisible={true}
    />
  );
}

function GeneralOption() {
  return (
    <GroupItem
      label="通用"
      icon="setting"
      onPress={() => router.push("/settings/general")}
      rightVisible={true}
    />
  );
}

function UpdateOption() {
  const { lastUpdateTime } = useSnapshot(updateState);
  const [sub, setSub] = useState(
    `${getTimeDiffLabel(lastUpdateTime, Date.now())}前检查过`
  );

  const handlePress = async () => {
    setSub("正在检查更新");

    const res = await checkUpdate();

    if (!res) {
      setSub("已是最新版");
      return;
    }

    setSub("更新中");

    await download();
  };

  return (
    <GroupItem
      label="检查更新"
      icon="update"
      sub={sub}
      onPress={handlePress}
      rightVisible={true}
    />
  );
}

function AboutOption() {
  return (
    <GroupItem
      label="关于"
      icon="about"
      sub={`v${appVersion}`}
      rightVisible={true}
      onPress={() => router.push("/settings/about")}
    />
  );
}

function UpdateProgress() {
  const { updateInfo, updateProgress, isUpdate } = useSnapshot(updateState);

  if (!isUpdate) {
    return null;
  }

  return (
    <Group
      data={[
        <View className="px-4 flex-1 flex-row justify-between items-center">
          <Text className="text-main text-lg">
            🎉 发现新版本v{updateInfo.version}
          </Text>

          <Text className="text-sub">{updateProgress}%</Text>
        </View>,
      ]}
    />
  );
}
