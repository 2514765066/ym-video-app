import Img from "@/components/img";
import TitleBar from "@/components/title-bar";
import { View, ImageBackground } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { router } from "expo-router";
import { Group, GroupItem } from "@/components/setting-group";
import { useSnapshot } from "valtio";
import { useMemo } from "react";
import { appVersion } from "@/services/info";
import { checkUpdate, download, updateState } from "@/stores/useUpdateStore";
import { getDayDiffLabel } from "@/utils/time";
import { configState } from "@/stores/useConfigStore";
import useLoading from "@/hooks/useLoading";
import * as dialog from "@/components/dialog";

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
  const { lastUpdateTime, updateStatus, updateProgress } =
    useSnapshot(updateState);

  const map: Record<string, string> = {
    checking: "正在检查更新",
    "update-available": "发现更新",
    "update-not-available": "已是最新版",
    downloading: `下载中: ${updateProgress}%`,
    downloaded: "下载完成",
    error: "出错了,请重试",
  };

  const handleUpdate = useLoading(async () => {
    const res = await checkUpdate();

    if (!res) {
      return;
    }

    const install = await download();

    if (!install) {
      return;
    }

    try {
      await dialog.confirm({
        label: "更新版本",
        content: "下载完成是否安装?",
        confirmLabel: "安装",
      });

      install();
    } catch {
      return;
    }
  });

  const subLabel = useMemo(() => {
    if (map[updateStatus]) {
      return map[updateStatus];
    }

    return `${getDayDiffLabel(lastUpdateTime, Date.now())}前检查过`;
  }, [updateStatus, updateProgress]);

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
      sub={appVersion}
      rightVisible={true}
      onPress={() => router.push("/settings/about")}
    />
  );
}
