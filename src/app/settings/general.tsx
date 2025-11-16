import Switch from "@/components/input/switch";
import { Group, GroupItem } from "@/components/setting-group";
import TitleBar, { BackControl } from "@/components/title-bar";
import { configState, toggleAutoUpdate } from "@/store/useConfigStore";
import { router } from "expo-router";
import { View, ScrollView } from "react-native";
import { useSnapshot } from "valtio";
import storage from "@/services/storage";
import RNRestart from "react-native-restart";
import * as db from "@/services/db";
import * as dialog from "@/components/dialog";

export default function () {
  return (
    <View className=" flex-1 bg-bg">
      <TitleBar title="通用" leftContent={<BackControl />} />

      <ScrollView
        contentContainerClassName="p-4 gap-4"
        showsVerticalScrollIndicator={false}
      >
        <Group data={[<AutoUpdateOption />, <RepoOption />]} />

        <Group data={[<ResetOption />]} />
      </ScrollView>
    </View>
  );
}

function AutoUpdateOption() {
  const { autoUpdate } = useSnapshot(configState);

  return (
    <GroupItem
      label="自动更新"
      sub={
        <Switch height={22} active={autoUpdate} onPress={toggleAutoUpdate} />
      }
      onPress={toggleAutoUpdate}
    />
  );
}

function RepoOption() {
  const { repo } = useSnapshot(configState);

  return (
    <GroupItem
      label="远程数据源"
      sub={repo.label}
      onPress={() => router.push("/settings/repo")}
      rightVisible={true}
    />
  );
}

function ResetOption() {
  const reset = () => {
    storage.reset();

    db.reset();

    RNRestart.restart();
  };

  const handlePress = async () => {
    try {
      await dialog.confirm({
        label: "确定要重置吗",
        content: "重置后会清除所有设置项，历史记录，搜索记录",
      });

      reset();
    } catch {
      return;
    }
  };

  return (
    <GroupItem
      label="重置"
      icon="remove"
      sub="删除所有数据"
      onPress={handlePress}
    />
  );
}
