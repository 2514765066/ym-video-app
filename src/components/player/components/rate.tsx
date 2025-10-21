import {
  Text,
  TouchableOpacity,
  Pressable,
  GestureResponderEvent,
} from "react-native";
import { rateList, rateStore, updateRate } from "../store/useRate";
import { useSnapshot } from "valtio";
import { FlatList } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import eventEmitter from "@/hooks/eventEmitter";

export default function () {
  const [visible, setVisible] = useState(false);

  const handleClose = (e: GestureResponderEvent) => {
    if (e.target != e.currentTarget) return;

    setVisible(false);
  };

  useEffect(() => {
    const { remove } = eventEmitter.on("player:rate:show", () => {
      setVisible(true);
    });

    return () => {
      remove();
    };
  }, []);

  return (
    visible && (
      <Pressable
        className="wh-full items-center absolute top-0 left-0 z-40"
        style={{
          backgroundColor: "rgba(0,0,0,0.8)",
        }}
        onPress={handleClose}
      >
        <FlatList
          className="w-1/4 h-full pt-6"
          contentContainerClassName="py-2 gap-2"
          showsVerticalScrollIndicator={false}
          data={rateList}
          keyExtractor={item => String(item.value)}
          renderItem={({ item }) => <Item data={item} />}
        />
      </Pressable>
    )
  );
}

type ItemProps = {
  data: {
    label: string;
    value: number;
  };
};

function Item({ data }: ItemProps) {
  const { rate } = useSnapshot(rateStore);

  return (
    <TouchableOpacity
      className="w-full py-2 flex-center rounded-xl"
      style={{
        backgroundColor:
          rate == data.value
            ? "rgba(255,255,255,0.81)"
            : "rgba(255,255,255,0.2)",
      }}
      onPress={() => updateRate(data.value)}
    >
      <Text
        className={`text-xl ${rate == data.value ? "text-333" : "text-main"}`}
      >
        {data.label}
      </Text>
    </TouchableOpacity>
  );
}
