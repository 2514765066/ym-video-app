import { MovieInfo } from "@/type";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { updateDetail } from "@/store/useDetailStore";
import Img from "../img";
import { formatRemarks, formatSub } from "@/utils/format";

type Props = {
  data: MovieInfo;
};

export default function ({ data }: Props) {
  const handlePress = () => {
    updateDetail(data);

    router.push("/details");
  };

  return (
    <Pressable onPress={handlePress}>
      <Base data={data} />
    </Pressable>
  );
}

type BaseProps = {
  data: MovieInfo;
};

function Base({ data }: BaseProps) {
  return (
    <View className="flex-row items-center gap-3">
      {/* 图片 */}
      <Img
        src={data.pic}
        className="aspect-3/4 rounded-lg overflow-hidden"
        style={{
          width: 90,
        }}
      />

      {/* 信息 */}
      <View className="flex-1 gap-3">
        {/* 标题 */}
        <Text
          className="font-bold text-xl text-main leading-6 tracking-wide"
          numberOfLines={1}
        >
          {data.name}
        </Text>

        {/* 副标题 */}
        <View className="flex-row items-center gap-2">
          <Text className="text-main-dark1">{formatSub(data.year)}</Text>

          <Text className="text-main-dark2">|</Text>

          <Text className="text-main-dark1">{formatSub(data.area)}</Text>

          <Text className="text-main-dark2">|</Text>

          <Text className="text-main-dark1">{formatSub(data.lang)}</Text>
        </View>

        {/* 简介 */}
        <Text
          numberOfLines={1}
          className="mt-auto text-main-dark1 leading-6 tracking-wide"
        >
          {data.url.length > 1
            ? formatRemarks(data.remarks)
            : data.sub || "暂无剧情简介......"}
        </Text>
      </View>
    </View>
  );
}

// function Loading() {
//   return (
//     <View className="w-full flex-row items-center gap-3">
//       <Skeleton className="w-1/4 aspect-3/4" />

//       <View className="flex-1 gap-3">
//         <Skeleton className="w-3/4 h-5" />

//         <Skeleton className="w-1/3 h-5" />

//         <Skeleton className="w-full h-5" />

//         <Skeleton className="w-1/2 h-5" />
//       </View>
//     </View>
//   );
// }
