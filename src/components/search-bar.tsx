import { LinearGradient } from "expo-linear-gradient";
import { TextInput, TouchableOpacity, View } from "react-native";
import KeyboardView from "./keyboard-view";
import Icon from "./icon";
import { search } from "@/store/useSearchStore";
import { router, usePathname } from "expo-router";
import { useState } from "react";

type Props = {
  closed?: number;
  opened?: number;
};

export default function ({ closed, opened }: Props) {
  return (
    <KeyboardView
      closed={closed}
      opened={opened}
      className="absolute left-0 bottom-0 z-10"
    >
      <LinearGradient
        colors={["transparent", "#191919"]}
        locations={[0, 0.5]}
        className="w-screen p-4 flex-center"
      >
        <SearchBar />
      </LinearGradient>
    </KeyboardView>
  );
}

function SearchBar() {
  const pathname = usePathname();
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    search(keyword);

    if (pathname != "/search") {
      router.push("/search");
    }

    setKeyword("");
  };

  return (
    <View
      className="h-14 px-2 flex-row items-center rounded-full  border border-main-dark3"
      style={{
        backgroundColor: "#232323",
      }}
    >
      <View className="w-10 h-10 flex-center">
        <Icon name="search" size={30} color="rgba(255,255,255,0.282)" />
      </View>

      <TextInput
        placeholder="搜索影视资源..."
        className="h-full flex-1 text-main text-lg"
        placeholderTextColor="rgba(255,255,255,0.282)"
        cursorColor="#ffffffcf"
        value={keyword}
        onChangeText={setKeyword}
      />

      <TouchableOpacity
        className="w-10 h-10 flex-center rounded-full bg-main aspect-square disabled:bg-444"
        disabled={!keyword}
        onPress={handleSearch}
      >
        <Icon
          name="arrow"
          size={20}
          color={keyword ? "#222" : "#191919"}
          className=" rotate-90"
          strokeWidth={1}
        />
      </TouchableOpacity>
    </View>
  );
}
