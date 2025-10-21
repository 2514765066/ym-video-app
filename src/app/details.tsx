import BottomSheet, { BottomSheetHandle } from "@/components/bottom-sheet";
import TitleBar, { BackControl } from "@/components/title-bar";
import { add, select } from "@/store/useHistoryStore";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
  Dimensions,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSnapshot } from "valtio";
import { detailState, getDetailData } from "@/store/useDetailStore";
import { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
} from "@gorhom/bottom-sheet";
import { Episode } from "@/type";
import Icon from "@/components/icon";
import useEpisode from "@/hooks/useEpisode";

const { height } = Dimensions.get("window");

export default function () {
  const { data } = useSnapshot(detailState);
  const bottomSheetRef = useRef<BottomSheetHandle>(null);

  //处理播放
  const handlePlay = (value: number) => {
    detailState.data.history = value;

    add(getDetailData());

    select(data.id);

    router.push("/player");
  };

  //处理选集
  const handleList = () => {
    bottomSheetRef.current?.open();
  };

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={["bottom"]}>
      <TitleBar
        blur={false}
        bg={false}
        leftComponent={<BackControl blur={true} />}
      />

      {/* 图片 */}
      <ImageBackground
        className="w-full absolute top-0 left-0 aspect-2/3"
        source={{
          uri: data.pic,
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-16"
      >
        <LinearGradient
          colors={["transparent", "transparent", "#191919"]}
          locations={[0, 0.5, 1]}
          style={{
            height: (height / 5) * 3,
          }}
        />

        {/* 详细信息 */}
        <View className="p-4 gap-2 bg-bg">
          <Text className="text-3xl text-main font-bold">{data.name}</Text>

          {/* 副标题 */}
          <View className="flex-row items-center flex-wrap gap-2 mb-4">
            <Text className="text-main">{data.year || "未知"}</Text>

            <Text className=" text-main-dark2">|</Text>

            <Text className="text-main">{data.type || "未知"}</Text>

            <Text className=" text-main-dark2">|</Text>

            <Text className="text-main">{data.area || "未知"}</Text>

            <Text className=" text-main-dark2">|</Text>

            <Text className="text-main">{data.lang || "未知"}</Text>
          </View>

          {/* 简介 */}
          <View className=" gap-2">
            <Text className="text-xl text-main font-bold">剧情简介</Text>
            <Text className=" text-main  leading-6">
              {data.sub || "暂无剧情简介......"}
            </Text>
          </View>
        </View>
      </ScrollView>

      <BottomControls
        listVisible={data.url.length > 1}
        onPlay={() => handlePlay(0)}
        onList={handleList}
      />

      <BottomSheet ref={bottomSheetRef} snapPoints={["60%"]}>
        <EpisodePicker onPlay={handlePlay} />
      </BottomSheet>
    </SafeAreaView>
  );
}

type BottomControlsProps = {
  listVisible?: boolean;
  onPlay: () => void;
  onList: () => void;
};

function BottomControls({ listVisible, onPlay, onList }: BottomControlsProps) {
  return (
    <LinearGradient
      colors={["transparent", "#191919"]}
      locations={[0, 0.2]}
      className="w-screen p-4 flex-row gap-2 absolute left-0 bottom-0"
    >
      <TouchableOpacity
        className="flex-1 h-12 flex-row flex-center gap-1.5 rounded-full bg-main"
        onPress={onPlay}
      >
        <Icon name="playFill" color="#333" size={20} />
        <Text className="text-xl text-333">播放</Text>
      </TouchableOpacity>

      {listVisible && (
        <TouchableOpacity
          className="w-12 h-12  flex-row flex-center rounded-full"
          style={{
            backgroundColor: "#D1D1D1",
          }}
          onPress={onList}
        >
          <Icon name="list" size={28} color="#333" strokeWidth={0.25} />
        </TouchableOpacity>
      )}
    </LinearGradient>
  );
}

type EpisodePickerProps = {
  onPlay: (value: number) => void;
};

function EpisodePicker({ onPlay }: EpisodePickerProps) {
  const { data } = useSnapshot(detailState);

  const episodeRef = useRef<BottomSheetFlatListMethods>(null);

  const { COUNT, pageList, itemWidth, page, setPage, EpisodeItem } = useEpisode(
    data.history,
    data.url.length
  );

  const handleLayout = () => {
    episodeRef.current?.scrollToIndex({
      index: page,
      animated: false,
    });
  };

  return (
    <View className="flex-1 gap-2">
      <BottomSheetFlatList
        className="flex-grow-0"
        contentContainerClassName="px-4 gap-4"
        ref={episodeRef}
        data={pageList}
        keyExtractor={(item: Episode) => String(item.value)}
        horizontal={true}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }: { item: Episode }) => (
          <TouchableOpacity onPress={() => setPage(item.value)}>
            <EpisodeItem active={item.value == page} label={item.label} />
          </TouchableOpacity>
        )}
        getItemLayout={(_: any, index: number) => ({
          length: itemWidth,
          offset: itemWidth * index + 16 * (index - 1),
          index,
        })}
        onLayout={handleLayout}
      />

      <BottomSheetFlatList
        numColumns={2}
        contentContainerClassName="px-4 py-2 gap-2"
        columnWrapperClassName="gap-2"
        showsVerticalScrollIndicator={false}
        data={data.url.slice(page * COUNT, page * COUNT + COUNT)}
        keyExtractor={(item: Episode) => String(item.value)}
        renderItem={({ item }: { item: Episode }) => (
          <Item
            data={item}
            active={data.history == item.value}
            onPress={() => onPlay(item.value)}
          />
        )}
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
