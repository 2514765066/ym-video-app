import MovieList from "@/components/card/movie-list";
import Icon from "@/components/icon";
import SearchBar from "@/components/search-bar";
import TitleBar, { BackControl } from "@/components/title-bar";
import useLoading from "@/hooks/useLoading";
import { useScrollTop } from "@/hooks/useScrollTop";
import { loadData, searchState } from "@/store/useSearchStore";
import { MovieInfo } from "@/type";
import {
  FlatList,
  View,
  Text,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSnapshot } from "valtio";

export default function () {
  const { isTop, onScroll } = useScrollTop();

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <TitleBar blur={!isTop} title="搜索" leftComponent={<BackControl />} />

      <SearchBar />

      <Content onScroll={onScroll} />
    </SafeAreaView>
  );
}

function Header() {
  const { keyword } = useSnapshot(searchState);

  return <Text className="text-main-dark1 text-xl">"{keyword}"的搜索结果</Text>;
}

type ContentProps = {
  onScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

function Content({ onScroll }: ContentProps) {
  const { data, loading } = useSnapshot(searchState);

  //加载更多数据
  const loadMoreData = useLoading(loadData);

  return (
    <FlatList
      contentContainerClassName="px-4 pt-12 pb-18 gap-4"
      data={loading ? [] : data}
      keyExtractor={(item, index) => item.name + index}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <MovieList data={item as MovieInfo} />}
      ListHeaderComponent={Header}
      ListFooterComponent={Footer}
      onScroll={onScroll}
      onEndReached={loadMoreData}
    />
  );
}

function Footer() {
  const { page, pageCount } = useSnapshot(searchState);

  return (
    <View className=" py-2 flex-center">
      {page == pageCount ? (
        <Text className="text-main-dark2 text-xl">到底了~</Text>
      ) : (
        <Loading />
      )}
    </View>
  );
}

function Loading() {
  return (
    <View className="flex-1 flex-center">
      <Icon
        name="loading"
        size={35}
        color="rgba(255,255,255,0.3)"
        style={{
          animationDuration: 1000,
          animationIterationCount: "infinite",
          animationTimingFunction: "linear",
          animationName: {
            0: {
              transform: [{ rotate: "0deg" }],
            },
            "50%": {
              transform: [{ rotate: "180deg" }],
            },
            "100%": {
              transform: [{ rotate: "360deg" }],
            },
          },
        }}
      />
    </View>
  );
}
