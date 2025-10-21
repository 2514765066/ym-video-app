import { useState } from "react";
import { View, Text } from "react-native";

const COUNT = 50;

export default function (history: number, count: number) {
  const itemWidth = 5 + String(count).length * 20;

  const [page, setPage] = useState(Math.floor(history / COUNT));

  const pageCount = Math.ceil(count / COUNT);

  const pad = (num: string | number) => {
    return String(num).padStart(String(count).length, "0");
  };

  const pageList = Array.from({ length: pageCount }, (_, i) => {
    const start = i * COUNT + 1;
    const end = Math.min((i + 1) * COUNT, count);

    return { label: `${pad(start)}-${pad(end)}`, value: i };
  });

  return {
    COUNT,
    pageList,
    page,
    itemWidth,
    setPage,
    EpisodeItem,
  };
}

type EpisodeItemProps = {
  active?: boolean;
  label?: string;
};

function EpisodeItem({ active, label }: EpisodeItemProps) {
  return (
    <View className="pb-1 items-center relative ">
      <Text className={`text-xl ${active ? "text-main" : "text-main-dark2"}`}>
        {label}
      </Text>

      <View
        className={`w-1/2 h-0.5  rounded-full absolute bottom-0 ${active ? "bg-main" : "transparent"}`}
      />
    </View>
  );
}
