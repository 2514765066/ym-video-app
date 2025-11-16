import Img from "@/components/img";
import TitleBar from "@/components/title-bar";
import { View, ImageBackground } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { router } from "expo-router";
import { Group, GroupItem } from "@/components/setting-group";
import { useSnapshot } from "valtio";
import { useMemo } from "react";
import { appVersion } from "@/services/info";
import { checkUpdate, download, updateState } from "@/store/useUpdateStore";
import { getTimeDiffLabel } from "@/utils/time";
import { configState } from "@/store/useConfigStore";
import useLoading from "@/hooks/useLoading";

export default function () {
  return (
    <View className="flex-1 bg-bg">
      <TitleBar title="设置" />

      <ScrollView
        contentContainerClassName="p-4 gap-4"
        showsVerticalScrollIndicator={false}
      >
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
  const { selectedSource } = useSnapshot(configState);

  return (
    <GroupItem
      label="播放源"
      icon="source"
      sub={selectedSource.label}
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
  const { lastUpdateTime, updateStatus, downloadStatus, updateProgress } =
    useSnapshot(updateState);

  const map: Record<string, string> = {
    error: "网络错误,请重试",
    checking: "正在检查更新",
    "update-not-available": "已是最新版",

    downloading: `下载中: ${updateProgress}%`,
    downloaded: "正在安装",
    failed: "下载失败",
  };

  const handleUpdate = useLoading(async () => {
    const res = await checkUpdate();

    if (!res) {
      return;
    }

    await download();
  });

  const subLabel = useMemo(() => {
    if (map[updateStatus]) {
      return map[updateStatus];
    }

    return `${getTimeDiffLabel(lastUpdateTime, Date.now())}前检查过`;
  }, [updateStatus, downloadStatus, updateProgress]);

  return (
    <GroupItem
      label="检查更新"
      icon="update"
      sub={subLabel}
      onPress={handleUpdate}
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
