import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import Icon from "./icon";

type Props = {
  disable?: boolean;
  placeholder?: string;
  onSubmit?: (keyword: string) => void;
  onChange?: (keyword: string) => void;
};

export type SearchBarHandle = {
  focus: () => void;
};

export default forwardRef<SearchBarHandle, Props>(
  ({ disable, placeholder = "搜索影视资源...", onSubmit, onChange }, ref) => {
    const [keyword, setKeyword] = useState("");

    const inputRef = useRef<TextInput>(null);

    const clear = () => {
      setKeyword("");

      onChange && onChange("");
    };

    //处理提交
    const handleSubmit = () => {
      if (keyword.trim().length == 0) {
        return;
      }

      onSubmit && onSubmit(keyword);

      clear();
    };

    //处理文字变化
    const handleChange = (value: string) => {
      setKeyword(value);

      onChange && onChange(value);
    };

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
      },
    }));

    return (
      <View
        className={`flex-1 px-2 flex-row items-center rounded-xl bg-222 ${disable && "pointer-events-none"}`}
      >
        <View className="w-10 h-10 flex-center">
          <Icon name="search" size={26} color="rgba(255,255,255,0.3)" />
        </View>

        <TextInput
          ref={inputRef}
          placeholder={placeholder}
          className="flex-1 text-main"
          placeholderTextColor="rgba(255,255,255,0.3)"
          cursorColor="rgba(255,255,255,0.8)"
          maxLength={15}
          value={keyword}
          onChangeText={handleChange}
          onSubmitEditing={handleSubmit}
        />

        {keyword.length > 0 && (
          <TouchableOpacity className="w-10 h-10 flex-center" onPress={clear}>
            <Icon name="close" size={26} color="rgba(255,255,255,0.2)" />
          </TouchableOpacity>
        )}
      </View>
    );
  }
);
