import HistoryList from "@/components/card/history-list";
import Empty from "@/components/empty";
import BottomSheetMenu, {
  BottomSheetMenuHandle,
} from "@/components/bottom-sheet/bottom-sheet-menu";
import SearchBar from "@/components/search-bar";
import TitleBar from "@/components/title-bar";
import { updateDetail } from "@/store/useDetailStore";
import { historyState, remove, select } from "@/store/useHistoryStore";
import { HistoryInfo } from "@/type";
import { groupByTime } from "@/utils/group";
import { router } from "expo-router";
import { createRef, useMemo } from "react";
import { SectionList, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { proxy, useSnapshot } from "valtio";

const moreRef = createRef<BottomSheetMenuHandle>();

const state = proxy({
  keyword: "",
});

export default function () {
  const handleChange = (value: string) => {
    state.keyword = value;
  };

  return (
    <View className="flex-1 bg-bg">
      <TitleBar
        boxShadow={false}
        content={
          <View className="px-4 py-1 flex-1">
            <SearchBar placeholder="搜索历史记录..." onChange={handleChange} />
          </View>
        }
      />

      <View className="flex-1 px-4">
        <Content />
      </View>

      <BottomSheetMenu
        title={(data: HistoryInfo) => data.name}
        ref={moreRef}
        data={[
          [
            {
              label: "播放",
              icon: "play",
              value: "play",
              onPress(data: HistoryInfo) {
                moreRef.current?.close();

                select(data.id);

                router.push("/player");
              },
            },
            {
              label: "详情",
              icon: "detail",
              value: "detail",
              onPress(data: HistoryInfo) {
                moreRef.current?.close();

                updateDetail(data);

                router.push("/details");
              },
            },
          ],
          [
            {
              label: "删除",
              icon: "remove",
              value: "remove",
              style: {
                color: "#f87171",
              },
              onPress(data: HistoryInfo) {
                moreRef.current?.close();

                remove(data.id);
              },
            },
          ],
        ]}
      />
    </View>
  );
}

function Content() {
  const { data } = useSnapshot(historyState);
  const { keyword } = useSnapshot(state);

  //按照分类的数据
  const sections = useMemo(() => {
    const res = groupByTime(data, item => item.time);

    return res.filter(item => item.data.length > 0);
  }, [data]);

  //搜索的数据
  const searchData = useMemo(() => {
    if (!keyword) {
      return [];
    }

    return Array.from(data.values())
      .filter(item => item.name.includes(keyword))
      .sort((a, b) => b.time - a.time);
  }, [keyword]);

  const handlePlay = (id: string) => {
    select(id);

    router.push("/player");
  };

  const handleMore = (data: HistoryInfo) => {
    moreRef.current?.open(data);
  };

  if (sections.length == 0 || (keyword && searchData.length == 0)) {
    return <Empty title="暂无更多历史记录..." />;
  }

  if (keyword) {
    return (
      <FlatList
        contentContainerClassName="pt-2 pb-20 gap-4"
        data={searchData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handlePlay(item.id)}
            onLongPress={() => handleMore(item)}
            delayLongPress={200}
          >
            <HistoryList data={item as HistoryInfo} />
          </TouchableOpacity>
        )}
      />
    );
  }

  return (
    <SectionList
      contentContainerClassName="pt-2 pb-20 gap-4"
      sections={sections}
      keyExtractor={item => String(item.id)}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => handlePlay(item.id)}
          onLongPress={() => handleMore(item)}
          delayLongPress={200}
        >
          <HistoryList data={item as HistoryInfo} />
        </TouchableOpacity>
      )}
      renderSectionHeader={({ section }) => (
        <Text className="text-main text-lg font-bold">{section.title}</Text>
      )}
    />
  );
}
