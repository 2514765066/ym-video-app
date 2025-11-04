import Radio from "@/components/input/radio";
import { Group, GroupItem } from "@/components/setting-group";
import TitleBar, { BackControl } from "@/components/title-bar";
import { View, ScrollView } from "react-native";
import { useSnapshot } from "valtio";
import { sources } from "@/store/useSourceStore";
import { configState, setSourceName } from "@/store/useConfigStore";

export default function () {
  return (
    <View className=" flex-1 bg-bg">
      <TitleBar title="播放源" leftContent={<BackControl />} />

      <ScrollView
        contentContainerClassName="p-4"
        showsVerticalScrollIndicator={false}
      >
        <Group
          data={sources}
          renderItem={({ item }) => <Item label={item.label} />}
        />
      </ScrollView>
    </View>
  );
}

type Props = {
  label: string;
};

function Item({ label }: Props) {
  const { sourceName } = useSnapshot(configState);

  return (
    <GroupItem
      label={label}
      sub={<Radio height={18} active={label == sourceName} />}
      onPress={() => setSourceName(label)}
    />
  );
}
