import { View } from "react-native";

export type RadioProps = {
  active?: boolean;
  height: number;
};

export default function ({ active, height }: RadioProps) {
  return (
    <View
      className={`flex-center aspect-square rounded-full border-main-dark2 ${active ? "bg-main" : "border"}`}
      style={{
        height,
      }}
    >
      <View
        className="aspect-square rounded-full bg-222"
        style={{
          height: height / 2,
        }}
      />
    </View>
  );
}
