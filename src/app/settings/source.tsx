import Radio from "@/components/input/radio";
import { Group, GroupItem } from "@/components/setting-group";
import TitleBar, { BackControl } from "@/components/title-bar";
import { View, ScrollView } from "react-native";
import { useSnapshot } from "valtio";
import { configState, removeSource, setSource } from "@/stores/useConfigStore";
import { router } from "expo-router";
import { Source } from "@/type";
import BottomSheetMenu, {
  BottomSheetMenuHandle,
} from "@/components/bottom-sheet/bottom-sheet-menu";
import { createRef } from "react";

const moreRef = createRef<BottomSheetMenuHandle>();

export default function () {
  const { sources } = useSnapshot(configState);

  return (
    <View className=" flex-1 bg-bg">
      <TitleBar title="播放源" leftContent={<BackControl />} />

      <ScrollView
        contentContainerClassName="p-4 gap-4"
        showsVerticalScrollIndicator={false}
      >
        <Group data={[<AddOption />]} />

        <Group
          data={sources as Source[]}
          itemKey={item => item.label}
          renderItem={({ item }) => <Item {...item} />}
        />
      </ScrollView>

      <BottomSheetMenu
        title={label => label}
        ref={moreRef}
        data={[
          [
            {
              label: "删除播放源",
              icon: "remove",
              value: "remove",
              style: {
                color: "#f87171",
              },

              onPress(label) {
                removeSource(label);
              },
            },
          ],
        ]}
      />
    </View>
  );
}

function Item(props: Source) {
  const { selectedSource } = useSnapshot(configState);

  return (
    <GroupItem
      label={props.label}
      sub={<Radio height={18} active={props.url == selectedSource.url} />}
      onPress={() => setSource(props)}
      onLongPress={() => moreRef.current?.open(props.label)}
    />
  );
}

function AddOption() {
  return (
    <GroupItem
      label="添加播放源"
      icon="add"
      onPress={() => router.push("/settings/add-source")}
      rightVisible={true}
    />
  );
}
