import { Group, GroupItem } from "@/components/setting-group";
import TitleBar, { BackControl } from "@/components/title-bar";
import { configState } from "@/stores/useConfigStore";
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
        <Group data={[<RepoOption />]} />

        <Group data={[<ResetOption />]} />
      </ScrollView>
    </View>
  );
}

function RepoOption() {
  const { selectedRepo } = useSnapshot(configState);

  return (
    <GroupItem
      label="远程数据源"
      sub={selectedRepo.label}
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
    const res = await dialog.confirm({
      title: "确定要重置吗？",
      content: "重置后会清除所有设置项，历史记录，搜索记录",
    });

    if (!res) {
      return;
    }

    reset();
  };

  return (
    <GroupItem
      label="清空软件数据"
      labelClassName="text-red-400"
      onPress={handlePress}
    />
  );
}
