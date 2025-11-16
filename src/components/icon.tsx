import { SvgXml } from "react-native-svg";
import { ViewStyle } from "react-native";
import Animated from "react-native-reanimated";
import rate from "@iconify/icons-fluent/top-speed-20-regular";
import list from "@iconify/icons-fluent/text-bullet-list-square-20-regular";
import back from "@iconify/icons-fluent/ios-arrow-24-regular";
import arrow from "@iconify/icons-fluent/arrow-left-20-regular";
import playFill from "@iconify/icons-fluent/play-20-filled";
import play from "@iconify/icons-fluent/play-20-regular";
import next from "@iconify/icons-fluent/next-20-regular";
import empty from "@iconify/icons-fluent/box-dismiss-20-regular";
import search from "@iconify/icons-fluent/search-20-regular";
import loading from "@iconify/icons-fluent/spinner-ios-20-filled";
import video from "@iconify/icons-fluent/video-20-filled";
import film from "@iconify/icons-fluent/video-clip-multiple-20-regular";
import filmFill from "@iconify/icons-fluent/video-clip-multiple-20-filled";
import remove from "@iconify/icons-fluent/delete-20-regular";
import brightness from "@iconify/icons-fluent/brightness-high-20-regular";
import volume2 from "@iconify/icons-fluent/speaker-2-20-regular";
import volume1 from "@iconify/icons-fluent/speaker-1-20-regular";
import volumeOff from "@iconify/icons-fluent/speaker-off-20-regular";
import detail from "@iconify/icons-fluent/apps-list-detail-20-regular";
import offline from "@iconify/icons-fluent/wifi-off-20-regular";
import history from "@iconify/icons-fluent/history-20-regular";
import close from "@iconify/icons-fluent/dismiss-circle-20-filled";
import enter from "@iconify/icons-fluent/arrow-enter-left-20-regular";
import more from "@iconify/icons-fluent/more-horizontal-20-regular";
import home from "@iconify/icons-fluent/home-20-regular";
import category from "@iconify/icons-fluent/grid-20-regular";
import setting from "@iconify/icons-fluent/settings-20-regular";
import source from "@iconify/icons-fluent/sound-source-20-regular";
import update from "@iconify/icons-fluent/arrow-circle-up-20-regular";
import bug from "@iconify/icons-fluent/bug-20-regular";
import globe from "@iconify/icons-fluent/globe-20-regular";
import about from "@iconify/icons-fluent/error-circle-20-regular";
import add from "@iconify/icons-fluent/add-circle-20-regular";
import link from "@iconify/icons-fluent/link-20-regular";
import tag from "@iconify/icons-fluent/tag-20-regular";

const iconPacks = {
  tag,
  link,
  add,
  rate,
  list,
  arrow,
  playFill,
  play,
  next,
  search,
  empty,
  loading,
  video,
  back,
  film,
  filmFill,
  remove,
  brightness,
  volume1,
  volume2,
  volumeOff,
  detail,
  offline,
  history,
  close,
  enter,
  more,
  home,
  category,
  setting,
  source,
  update,
  bug,
  globe,
  about,
  gitee: {
    width: 24,
    height: 24,
    body: `<path d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12a12 12 0 0 0 12-12A12 12 0 0 0 12 0zm6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.63c0 .327.266.592.593.592h5.63c.982 0 1.778-.796 1.778-1.778v-.296a.593.593 0 0 0-.592-.593h-4.15a.59.59 0 0 1-.592-.592v-1.482a.593.593 0 0 1 .593-.592h6.815c.327 0 .593.265.593.592v3.408a4 4 0 0 1-4 4H5.926a.593.593 0 0 1-.593-.593V9.778a4.444 4.444 0 0 1 4.445-4.444h8.296Z"/>`,
  },
  github: {
    width: 24,
    height: 24,
    body: `<path d="M12 .297c-6.63 0-12 5.373-12 12c0 5.303 3.438 9.8 8.205 11.385c.6.113.82-.258.82-.577c0-.285-.01-1.04-.015-2.04c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729c1.205.084 1.838 1.236 1.838 1.236c1.07 1.835 2.809 1.305 3.495.998c.108-.776.417-1.305.76-1.605c-2.665-.3-5.466-1.332-5.466-5.93c0-1.31.465-2.38 1.235-3.22c-.135-.303-.54-1.523.105-3.176c0 0 1.005-.322 3.3 1.23c.96-.267 1.98-.399 3-.405c1.02.006 2.04.138 3 .405c2.28-1.552 3.285-1.23 3.285-1.23c.645 1.653.24 2.873.12 3.176c.765.84 1.23 1.91 1.23 3.22c0 4.61-2.805 5.625-5.475 5.92c.42.36.81 1.096.81 2.22c0 1.606-.015 2.896-.015 3.286c0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>`,
  },
};

export type IconName = keyof typeof iconPacks;

type Props = {
  name: IconName;
  size?: number;
  color?: string;
  className?: string;
  strokeWidth?: number;
  stroke?: string;
  style?: ViewStyle;
};

interface IconOption {
  width: number;
  height: number;
  body: string;
}

export default function ({
  name,
  size = 24,
  color = "rgba(255,255,255,0.81)",
  className,
  strokeWidth = 0,
  stroke,
  style,
}: Props) {
  const { body, width = 20, height = 20 } = iconPacks[name] as IconOption;

  const xml = `<svg width="${size}" height="${size}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">${body.replace(/fill="currentColor"/g, "")}</svg>`;

  return (
    <Animated.View
      className={className}
      style={{ width: size, height: size, ...style }}
    >
      <SvgXml
        xml={xml}
        strokeWidth={strokeWidth}
        stroke={stroke || color}
        fill={color}
      />
    </Animated.View>
  );
}
