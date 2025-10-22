import MovieList from "@/components/card/movie-list";
import TopCard from "@/components/card/top-card";
import Icon from "@/components/icon";
import SearchBar from "@/components/search-bar";
import Skeleton from "@/components/skeleton";
import TitleBar from "@/components/title-bar";
import useLoading from "@/hooks/useLoading";
import { useScrollTop } from "@/hooks/useScrollTop";
import {
  categories,
  changeCategory,
  changeChildCategory,
  loadCategoryData,
  movieState,
} from "@/store/useMovieStore";
import { MovieInfo } from "@/type";
import { useMemo } from "react";
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Carousel from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSnapshot } from "valtio";

const { width } = Dimensions.get("window");

export default function () {
  const { isTop, onScroll } = useScrollTop();

  return (
    <SafeAreaView className="flex-1 bg-bg">
      <TitleBar blur={!isTop} titleComponent={<Title />} />

      <Content onScroll={onScroll} />
    </SafeAreaView>
  );
}

function Title() {
  const { selectedCategory } = useSnapshot(movieState);

  const handlePress = (index: number) => {
    if (index == selectedCategory) {
      return;
    }

    changeCategory(index);
  };

  return (
    <View className="flex-row items-center gap-4">
      {categories.map((item, index) => (
        <CategoryItem
          key={item.id}
          label={item.label}
          active={index == selectedCategory}
          onPress={() => handlePress(index)}
        />
      ))}
    </View>
  );
}

function Header() {
  const { selectedCategory, selectedChildCategory } = useSnapshot(movieState);

  const childCategory = useMemo(() => {
    return categories[selectedCategory].children;
  }, [selectedCategory]);

  const handlePress = (index: number) => {
    if (index == selectedChildCategory) {
      return;
    }

    changeChildCategory(index);
  };

  return (
    <View>
      <Banner />

      {/* <ScrollView
        horizontal={true}
        contentContainerClassName="px-4 py-1 gap-4"
        showsHorizontalScrollIndicator={false}
      >
        {childCategory.map((item, index) => (
          <Item
            key={item.id}
            small={true}
            label={item.label}
            active={index == selectedChildCategory}
            onPress={() => handlePress(index)}
          />
        ))}
      </ScrollView> */}
    </View>
  );
}

function Banner() {
  const { loading, data } = useSnapshot(movieState);

  if (loading) {
    return (
      <View
        className="flex-row rounded-xl aspect-3/2"
        style={{
          width,
        }}
      >
        <View className="flex-1 p-5 pr-1 gap-4">
          <Skeleton className="w-3/4 h-5 mb-4" />

          <Skeleton className="w-full h-5" />

          <Skeleton className="w-full h-5" />

          <Skeleton className="w-1/2 h-5" />

          <Skeleton className="w-1/3 h-5 mt-auto" />
        </View>

        <View className="flex-1 p-4">
          <Skeleton className="wh-full" />
        </View>
      </View>
    );
  }

  return (
    <Carousel
      width={width}
      height={(width / 3) * 2}
      data={data.slice(0, 3)}
      autoPlay={true}
      autoPlayInterval={2000}
      mode="parallax"
      modeConfig={{
        parallaxScrollingScale: 0.9,
        parallaxAdjacentItemScale: 0.9,
        parallaxScrollingOffset: width * 0.1 - 10,
      }}
      renderItem={({ item }) => <TopCard data={item as MovieInfo} />}
    />
  );
}

type ContentProps = {
  onScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

function Content({ onScroll }: ContentProps) {
  const { data, loading } = useSnapshot(movieState);

  //加载更多数据
  const loadMoreData = useLoading(loadCategoryData);

  return (
    <FlatList
      contentContainerClassName="pt-11 pb-14 gap-4"
      data={loading ? [] : data.slice(3)}
      removeClippedSubviews={true}
      keyExtractor={(item, index) => item.name + index}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <View className="px-4">
          <MovieList data={item as MovieInfo} />
        </View>
      )}
      ListHeaderComponent={Header}
      ListFooterComponent={Footer}
      onScroll={onScroll}
      onEndReached={loadMoreData}
    />
  );
}

function Footer() {
  const { page, pageCount } = useSnapshot(movieState);

  return (
    <View className="py-2 flex-center">
      {page == pageCount ? (
        <Text className="text-main-dark2 text-xl">到底了~</Text>
      ) : (
        <Loading />
      )}
    </View>
  );
}

type ItemProps = {
  active?: boolean;
  label?: string;
  small?: boolean;
  onPress: () => void;
};

function CategoryItem({ active, label, small, onPress }: ItemProps) {
  return (
    <TouchableOpacity className="pb-1 items-center relative" onPress={onPress}>
      <Text
        className={`${small ? "text-lg" : "text-xl"} ${active ? "text-main" : "text-main-dark2"}`}
      >
        {label}
      </Text>

      <View
        className={`w-1/2 h-0.5  rounded-full absolute bottom-0 ${active ? "bg-main" : "transparent"}`}
      />
    </TouchableOpacity>
  );
}

function Loading() {
  return (
    <View className="flex-center">
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
