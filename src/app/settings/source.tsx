import Radio from "@/components/input/radio";
import { Group, GroupItem } from "@/components/setting-group";
import TitleBar, { BackControl } from "@/components/title-bar";
import { View, ScrollView } from "react-native";
import { useSnapshot } from "valtio";
import { configState, setSource } from "@/store/useConfigStore";

type Source = {
  label: string;
  url: string;
};

export const sources: Source[] = [
  {
    label: "量子资源",
    url: "https://cj.lziapi.com/api.php/provide/vod/",
  },
  {
    label: "暴风资源",
    url: "https://bfzyapi.com/api.php/provide/vod/",
  },
  {
    label: "如意资源",
    url: "http://cj.rycjapi.com/api.php/provide/vod/",
  },
  {
    label: "茅台资源",
    url: "https://caiji.maotaizy.cc/api.php/provide/vod/",
  },
  {
    label: "极速资源",
    url: "https://jszyapi.com/api.php/provide/vod/",
  },
  {
    label: "豆瓣资源",
    url: "https://dbzy.tv/api.php/provide/vod/",
  },
  {
    label: "魔都资源",
    url: "https://www.mdzyapi.com/api.php/provide/vod/",
  },
];

export default function () {
  return (
    <View className=" flex-1 bg-bg">
      <TitleBar title="播放源" leftContent={<BackControl />} />

      <ScrollView
        contentContainerClassName="p-4"
        showsVerticalScrollIndicator={false}
      >
        <Group data={sources} renderItem={({ item }) => <Item {...item} />} />
      </ScrollView>
    </View>
  );
}

function Item(props: Source) {
  const { source } = useSnapshot(configState);

  return (
    <GroupItem
      label={props.label}
      sub={<Radio height={18} active={props.url == source.url} />}
      onPress={() => setSource(props)}
    />
  );
}
