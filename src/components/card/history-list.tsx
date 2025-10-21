import Img from "@/components/img";
import { HistoryInfo } from "@/type";
import { formatRemarks } from "@/utils/format";
import { formatHistory } from "@/utils/format";
import { useMemo } from "react";
import { Text, View } from "react-native";

type Props = {
  data: HistoryInfo;
};

export default function ({ data }: Props) {
  const progress = useMemo(() => {
    if (!data.progress[data.history]) {
      return 0;
    }

    return (
      Math.floor(
        (data.progress[data.history].currentTime /
          data.progress[data.history].duration) *
          100
      ) || 0
    );
  }, [data.progress[data.history]]);

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

        <Text numberOfLines={1} className="font-bold text-xl text-main">
          {data.name}
        </Text>

        {data.remarks.includes("更新") && (
          <View className="flex-row">
            <Text className="px-2 py-0.5 flex-center rounded-full text-sm text-222 bg-main">
              {formatRemarks(data.remarks)}
            </Text>
          </View>
        )}

        <Text className="text-main-dark1">
          {data.url[data.history].label} · 观看至{progress}%
        </Text>

        <Text className="text-main-dark1">{formatHistory(data.time)}</Text>
      </View>
    </View>
  );
}
