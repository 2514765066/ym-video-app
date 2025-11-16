import { withResolvers } from "@/utils/promise";
import { View, Text, TouchableOpacity } from "react-native";
import { proxy, useSnapshot } from "valtio";

const state = proxy({
  label: "",
  content: "",
  visible: false,

  confirm: () => {},
  cancel: () => {},
});

interface ConfirmOption {
  label: string;
  content: string;
}

export const confirm = ({ label, content }: ConfirmOption) => {
  const { promise, reject, resolve } = withResolvers<boolean>();

  state.label = label;
  state.content = content;
  state.visible = true;
  state.confirm = () => {
    resolve(true);
  };
  state.cancel = () => {
    reject(false);
    state.visible = false;
  };

  return promise;
};

export default function () {
  const { label, content, visible, cancel, confirm } = useSnapshot(state);

  if (!visible) {
    return;
  }

  return (
    <View
      className="flex-center absolute inset-0 z-999 "
      style={{
        backgroundColor: "rgba(0,0,0,0.4)",
      }}
    >
      <View
        className=" bg-bg rounded-2xl"
        style={{
          width: 250,
          boxShadow: [
            {
              offsetX: 0,
              offsetY: 1,
              color: "rgba(0,0,0,0.5)",
              blurRadius: 10,
            },
          ],
        }}
      >
        <View className="p-4 gap-4">
          <Text className="text-main text-center  text-lg">{label}</Text>

          <Text className="text-main text-center">{content}</Text>
        </View>

        <View className="w-full h-12 flex-row border-t border-border">
          <TouchableOpacity
            className="flex-1 flex-center border-r border-border"
            onPress={confirm}
          >
            <Text className="text-primary">确定</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-1 flex-center" onPress={cancel}>
            <Text className="text-primary">取消</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
