import Switch from "@/components/input/switch";
import { Group, GroupItem } from "@/components/setting-group";
import TitleBar, { BackControl } from "@/components/title-bar";
import { configState, toggleAutoUpdate } from "@/store/useConfigStore";
import { View, ScrollView } from "react-native";
import { useSnapshot } from "valtio";

export default function () {
  return (
    <View className=" flex-1 bg-bg">
      <TitleBar title="通用" leftContent={<BackControl />} />

      <ScrollView
        contentContainerClassName="p-4 gap-4"
        showsVerticalScrollIndicator={false}
      >
        <Group data={[<AutoUpdateOption />]} />
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
