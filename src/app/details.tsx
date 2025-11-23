import { add, select } from "@/stores/useHistoryStore";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSnapshot } from "valtio";
import { detailState, getDetailData } from "@/stores/useDetailStore";
import { useRef, useState } from "react";
import { Episode } from "@/type";
import useEpisode from "@/hooks/useEpisode";
import BottomBar from "@/components/bottom-bar";
import TitleBar from "@/components/title-bar";
import Img from "@/components/img";

const COUNT = 30;

export default function () {
  const { data } = useSnapshot(detailState);

  const [selectedIndex, setSelectedIndex] = useState(0);

  //处理播放
  const handlePlay = (value: number) => {
    detailState.data.history = value;

    add(getDetailData());

    select(data.id);

    router.push("/player");
  };

  return (
    <View className="flex-1 bg-bg">
      {/* 图片 */}
      <Img className="w-full absolute top-0 left-0 aspect-3/4" src={data.pic} />

      {selectedIndex == 0 ? (
        <DetailContent />
      ) : (
        <EpisodeContent onPlay={handlePlay} />
      )}

      <BottomBar
        leftOption={{
          icon: "arrow",
          onPress: () => router.back(),
        }}
        rightOption={{
          icon: "play",
          onPress: () => handlePlay(data.history),
        }}
        tabs={[
          {
            label: "详情",
            onPress() {
              setSelectedIndex(0);
            },
          },
          {
            label: "选集",
            onPress() {
              setSelectedIndex(1);
            },
          },
        ]}
      />
    </View>
  );
}

function DetailContent() {
  const { data } = useSnapshot(detailState);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerClassName="pb-20"
    >
      <LinearGradient
        colors={["transparent", "transparent", "#191919"]}
        locations={[0, 0.5, 1]}
        className="w-full aspect-3/4 "
      />

      <View className="p-4 gap-4 bg-bg">
        <View className="gap-2">
          <Text className="text-3xl text-main font-medium">{data.name}</Text>

          <View className="flex-row flex-wrap gap-2">
            <Text className="text-main-dark1">{data.year || "未知"}</Text>

            <Text className=" text-main-dark2">|</Text>

            <Text className="text-main-dark1">{data.type || "未知"}</Text>

            <Text className=" text-main-dark2">|</Text>

            <Text className="text-main-dark1">{data.area || "未知"}</Text>

            <Text className=" text-main-dark2">|</Text>

            <Text className="text-main-dark1">{data.lang || "未知"}</Text>
          </View>
        </View>

        <View className="gap-2">
          <Text className="text-xl text-main font-medium">集数</Text>

          <Text className=" text-main-dark1">
            <Text>共{data.url.length}集</Text>

            {data.remarks.includes("更新") && (
              <Text className=" text-main-dark1"> · {data.remarks}</Text>
            )}
          </Text>
        </View>

        <View className="gap-2">
          <Text className="text-xl text-main font-medium">剧情简介</Text>

          <Text className="text-main-dark1 leading-6">
            {data.content || "暂无剧情简介......"}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

type EpisodeContentProps = {
  onPlay: (value: number) => void;
};

function EpisodeContent({ onPlay }: EpisodeContentProps) {
  const { data } = useSnapshot(detailState);

  const episodeRef = useRef<FlatList>(null);

  const { pageList, itemWidth, page, setPage, EpisodeItem } = useEpisode(
    data.history,
    data.url.length,
    COUNT
  );

  const handleLayout = () => {
    episodeRef.current?.scrollToIndex({
      index: page,
      animated: false,
    });
  };

  return (
    <View className="flex-1 bg-bg">
      <TitleBar title={data.name} />

      <FlatList
        numColumns={3}
        contentContainerClassName="px-4 pt-4 pb-20 gap-2"
        columnWrapperClassName="gap-2"
        showsVerticalScrollIndicator={false}
        data={data.url.slice(page * COUNT, page * COUNT + COUNT)}
        keyExtractor={item => String(item.value)}
        renderItem={({ item }) => (
          <Item
            data={item}
            active={data.history == item.value}
            onPress={() => onPlay(item.value)}
          />
        )}
        ListHeaderComponent={
          <FlatList
            className="mb-2"
            contentContainerStyle={{
              gap: 16,
            }}
            ref={episodeRef}
            data={pageList}
            keyExtractor={item => String(item.value)}
            horizontal={true}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <EpisodeItem
                active={item.value == page}
                label={item.label}
                onPress={() => setPage(item.value)}
              />
            )}
            getItemLayout={(_, index) => ({
              length: itemWidth,
              offset: itemWidth * index + 16 * (index - 1),
              index,
            })}
            onLayout={handleLayout}
          />
        }
      />
    </View>
  );
}

type ItemProps = {
  data: Episode;
  active?: boolean;
  onPress?: () => void;
};

function Item({ data, active, onPress }: ItemProps) {
  return (
    <TouchableOpacity
      className="flex-1 h-12 py-2 flex-center rounded-lg"
      style={{
        backgroundColor: active ? "rgba(255,255,255,0.81)" : "#282828",
      }}
      onPress={onPress}
    >
      <Text className={`text-lg ${active ? "text-333" : "text-main"}`}>
        {data.label}
      </Text>
    </TouchableOpacity>
  );
}
