import { View } from "react-native";

type Props = {
  className?: string;
};

export default function ({ className }: Props) {
  return (
    <View
      className={`rounded-lg ${className}`}
      style={{
        backgroundColor: "#2c2c2c",
      }}
    ></View>
  );
}
