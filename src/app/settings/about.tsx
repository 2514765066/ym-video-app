import { Group, GroupItem } from "@/components/setting-group";
import TitleBar, { BackControl } from "@/components/title-bar";
import { View, ScrollView } from "react-native";
import { openURL } from "expo-linking";
import { appVersion } from "@/services/info";

export default function () {
  return (
    <View className=" flex-1 bg-bg">
      <TitleBar title="关于" leftContent={<BackControl />} />

      <ScrollView
        contentContainerClassName="p-4 gap-4"
        showsVerticalScrollIndicator={false}
      >
        <Group data={[<VersionOption />]} />

        <Group data={[<AddressOption />, <IssueOption />]} />
      </ScrollView>
    </View>
  );
}

function AddressOption() {
  const handlePress = () => {
    openURL("https://github.com/2514765066/ym-video-app");
  };

  return (
    <GroupItem
      label="项目地址"
      icon="globe"
      onPress={handlePress}
      rightVisible={true}
    />
  );
}

function IssueOption() {
  const handlePress = () => {
    openURL("https://github.com/2514765066/ym-video-app/issues");
  };

  return (
    <GroupItem
      label="反馈问题"
      icon="bug"
      onPress={handlePress}
      rightVisible={true}
    />
  );
}

function VersionOption() {
  return <GroupItem label="当前版本" sub={appVersion} />;
}
