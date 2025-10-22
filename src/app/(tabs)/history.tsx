import BottomSheet, { BottomSheetHandle } from "@/components/bottom-sheet";
import HistoryList from "@/components/card/history-list";
import Icon from "@/components/icon";
import SearchBar from "@/components/search-bar";
import TitleBar from "@/components/title-bar";
import { useScrollTop } from "@/hooks/useScrollTop";
import { updateDetail } from "@/store/useDetailStore";
import { historyState, remove, select } from "@/store/useHistoryStore";
import { HistoryInfo } from "@/type";
import { groupByTime } from "@/utils/group";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { createRef, useMemo } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  SectionList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSnapshot } from "valtio";

const bottomSheetRef = createRef<BottomSheetHandle>();

export default function () {
  const { selectedHistory, selectedID } = useSnapshot(historyState);
  const { isTop, onScroll } = useScrollTop();

  const handlePlay = () => {
    bottomSheetRef.current?.close();

    router.push("/player");
  };

  const handleDetail = () => {
    bottomSheetRef.current?.close();

    updateDetail(selectedHistory as HistoryInfo);

    router.push("/details");
  };

  const handleRemove = () => {
    bottomSheetRef.current?.close();

    remove(selectedID);
  };

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <TitleBar blur={!isTop} title="历史记录" />

      {/* <SearchBar closed={14} /> */}

      <Content onScroll={onScroll} />

      <BottomSheet ref={bottomSheetRef} snapPoints={[280]}>
        <BottomSheetView className="px-4 py-2 flex-1 items-center gap-4">
          <Text className="text-main text-lg font-bold">
            {selectedHistory.name}
          </Text>

          <View
            className="w-full rounded-xl overflow-hidden border border-main-dark3"
            style={{
              backgroundColor: "#252525",
            }}
          >
            <TouchableOpacity
              className="w-full p-4 flex-row items-center gap-4 border-b border-main-dark3"
              onPress={handlePlay}
            >
              <Icon name="play" size={25} color="#888" />

              <Text className="text-main text-lg ">播放</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="w-full p-4 flex-row items-center gap-4"
              onPress={handleDetail}
            >
              <Icon name="detail" size={25} color="#888" />

              <Text className="text-main text-lg ">详情</Text>
            </TouchableOpacity>
          </View>

          <View
            className="w-full rounded-xl overflow-hidden border border-main-dark3"
            style={{
              backgroundColor: "#252525",
            }}
          >
            <Pressable
              className="w-full p-4 flex-row items-center gap-4"
              onPress={handleRemove}
            >
              <Icon name="remove" size={25} color="#f87171" />

              <Text className="text-red-400 text-lg ">删除</Text>
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
}

type ContentProps = {
  onScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

function Content({ onScroll }: ContentProps) {
  const { data } = useSnapshot(historyState);

  const sections = useMemo(() => {
    const res = groupByTime(data as HistoryInfo[], item => item.time);

    return res.filter(item => item.data.length > 0);
  }, [data]);

  const handlePlay = (id: string) => {
    select(id);

    router.push("/player");
  };

  const handleMore = (id: string) => {
    select(id);

    bottomSheetRef.current?.open();
  };

  if (sections.length == 0) {
    return <Empty />;
  }

  return (
    <SectionList
      contentContainerClassName="px-4 pt-12 pb-14 gap-4"
      sections={sections}
      keyExtractor={item => String(item.id)}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => handlePlay(item.id)}
          onLongPress={() => handleMore(item.id)}
          delayLongPress={200}
        >
          <HistoryList data={item as HistoryInfo} />
        </Pressable>
      )}
      renderSectionHeader={({ section }) => (
        <Text className="text-main text-xl font-bold ">{section.title}</Text>
      )}
      onScroll={onScroll}
    />
  );
}

function Empty() {
  return (
    <View className="wh-full flex-center gap-4">
      <Icon name="empty" size={100} color="rgba(255,255,255,0.3)" />

      <Text className="text-main-dark2 text-lg">暂无更多内容...</Text>
    </View>
  );
}
