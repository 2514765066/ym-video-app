import TabBar from "@/components/tab-bar";
import { Tabs } from "expo-router";
import { useEffect } from "react";
import { useSnapshot } from "valtio";
import * as movieStore from "@/store/useMovieStore";
import * as latestStore from "@/store/useLatestMovieStore";
import Icon from "@/components/icon";
import { configState } from "@/store/useConfigStore";

export default function TabLayout() {
  const { sourceName } = useSnapshot(configState);

  useEffect(() => {
    movieStore.init();
    latestStore.init();
  }, [sourceName]);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <TabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="home"
              size={30}
              color={
                focused ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.3)"
              }
            />
          ),
        }}
      />

      <Tabs.Screen
        name="category"
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="category"
              size={30}
              color={
                focused ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.3)"
              }
            />
          ),
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="history"
              size={30}
              color={
                focused ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.3)"
              }
            />
          ),
        }}
      />

      <Tabs.Screen
        name="setting"
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="setting"
              size={30}
              color={
                focused ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.3)"
              }
            />
          ),
        }}
      />
    </Tabs>
  );
}

// function HistoryBar() {
//   const { selectedProgress, selectedHistory } = useSnapshot(historyState);

//   const progress = useMemo(() => {
//     if (!selectedProgress) {
//       return 0;
//     }

//     return (
//       Math.floor(
//         (selectedProgress.currentTime / selectedProgress.duration) * 100
//       ) || 0
//     );
//   }, [selectedProgress]);

//   const handlePress = () => {
//     router.push("/player");
//   };

//   return (
//     selectedHistory.id && (
//       <LinearGradient
//         className="w-screen px-4 absolute left-0 z-10"
//         style={{
//           bottom: 60,
//         }}
//         colors={["transparent", "#191919"]}
//         locations={[0, 0.5]}
//       >
//         <View
//           className="p-1.5 flex-row items-center gap-1.5 rounded-full overflow-hidden bg-222"
//           style={{
//             height: 42,
//           }}
//         >
//           <Img
//             src={selectedHistory.pic}
//             className="h-full aspect-square rounded-full overflow-hidden border border-main-dark2"
//           />

//           {/* 信息 */}
//           <Text numberOfLines={1} className="flex-1 flex-row">
//             <Text className="text-main">{selectedHistory.name}</Text>

//             <Text className="text-sub"> - </Text>

//             <Text className="text-sub">
//               {selectedHistory.url[selectedHistory.history].label}
//             </Text>
//           </Text>

//           {/* 播放进度 */}
//           <Pressable
//             className="ml-auto flex-center relative rounded-full aspect-square bg-444"
//             onPress={handlePress}
//             style={{
//               width: 30,
//             }}
//           >
//             <PieSlice radius={15} precent={progress} />

//             <View className="m-0.5 flex-center absolute inset-0 rounded-full bg-222">
//               <Icon name="playFill" size={18} />
//             </View>
//           </Pressable>
//         </View>
//       </LinearGradient>
//     )
//   );
// }

// type PieSliceProps = {
//   radius: number;
//   precent: number;
//   color?: string;
//   className?: string;
// };

// const deg2rad = (deg: number) => (deg * Math.PI) / 180;

// function PieSlice({
//   radius,
//   precent,
//   color = "rgba(255,255,255,0.8)",
//   className,
// }: PieSliceProps) {
//   const endAngle = 360 * precent * 0.01;

//   const cx = radius;
//   const cy = radius;

//   // 360° 圆
//   if (precent >= 100) {
//     return (
//       <Svg width={radius * 2} height={radius * 2}>
//         <Circle cx={cx} cy={cy} r={radius} fill={color} />
//       </Svg>
//     );
//   }

//   // 顶部为 0°，所以偏移 -90°
//   const start = -90;
//   const end = endAngle - 90;

//   const x1 = cx + radius * Math.cos(deg2rad(start));
//   const y1 = cy + radius * Math.sin(deg2rad(start));

//   const x2 = cx + radius * Math.cos(deg2rad(end));
//   const y2 = cy + radius * Math.sin(deg2rad(end));

//   const largeArcFlag = endAngle > 180 ? "1" : "0";

//   const pathData = `
//     M ${cx} ${cy}
//     L ${x1} ${y1}
//     A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}
//     Z
//   `;

//   return (
//     <Svg width={radius * 2} height={radius * 2} className={className}>
//       <Path d={pathData} fill={color} />
//     </Svg>
//   );
// }
