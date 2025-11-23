import HistoryList from "@/components/card/history-list";
import Empty from "@/components/empty";
import BottomSheetMenu, {
  BottomSheetMenuHandle,
} from "@/components/bottom-sheet/bottom-sheet-menu";
import TitleBar from "@/components/title-bar";
import { updateDetail } from "@/stores/useDetailStore";
import { historyState, remove, select } from "@/stores/useHistoryStore";
import { HistoryInfo } from "@/type";
import { groupByTime } from "@/utils/group";
import { router } from "expo-router";
import { createRef, useMemo } from "react";
import { SectionList, Text, TouchableOpacity, View } from "react-native";
import { useSnapshot } from "valtio";
import Icon from "@/components/icon";

const historyMoreRef = createRef<BottomSheetMenuHandle>();

const moreRef = createRef<BottomSheetMenuHandle>();

export default function () {
  const handleMore = () => {
    moreRef.current?.open();
  };

  return (
    <View className="flex-1 bg-bg">
      <TitleBar
        title="历史记录"
        rightContent={
          <TouchableOpacity
            className="flex-1 flex-center aspect-square"
            onPress={handleMore}
          >
            <Icon name="more" size={26} />
          </TouchableOpacity>
        }
      />

      <View className="flex-1 px-4">
        <Content />
      </View>

      <BottomSheetMenu
        title={(data: HistoryInfo) => data.name}
        ref={historyMoreRef}
        data={[
          [
            {
              label: "播放",
              icon: "play",
              value: "play",
              onPress(data: HistoryInfo) {
                historyMoreRef.current?.close();

                select(data.id);

                router.push("/player");
              },
            },
            {
              label: "详情",
              icon: "detail",
              value: "detail",
              onPress(data: HistoryInfo) {
                historyMoreRef.current?.close();

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
                historyMoreRef.current?.close();

                remove(data.id);
              },
            },
          ],
        ]}
      />

      <BottomSheetMenu
        title="更多操作"
        ref={moreRef}
        data={[
          [
            {
              label: "删除所有历史记录",
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

  //按照分类的数据
  const sections = useMemo(() => {
    const res = groupByTime(data, item => item.time);

    return res.filter(item => item.data.length > 0);
  }, [data]);

  const handlePlay = (id: string) => {
    select(id);

    router.push("/player");
  };

  const handleMore = (data: HistoryInfo) => {
    historyMoreRef.current?.open(data);
  };

  if (sections.length == 0) {
    return <Empty title="暂无更多历史记录..." />;
  }

  return (
    <SectionList
      contentContainerClassName="py-4 gap-4"
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
