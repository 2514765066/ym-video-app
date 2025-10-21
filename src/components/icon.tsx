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

const iconPacks = {
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
  history: {
    body: `<path d="M10,6.88c0-.35-.28-.63-.63-.63s-.63,.28-.63,.63v5c0,.35,.28,.63,.63,.63h3.75c.35,0,.63-.28,.63-.63s-.28-.63-.63-.63h-3.13V6.88Zm0,13.13h0c-.4,0-.78-.02-1.17-.07,0,0-.02,0-.03,0-.36-.04-.72-.11-1.07-.19-.05-.01-.1-.03-.15-.04-.31-.08-.62-.17-.92-.28-.06-.02-.13-.05-.19-.07-.3-.11-.58-.24-.86-.37-.04-.02-.08-.03-.12-.05l-.1-.06c-1.8-.94-3.27-2.41-4.22-4.2h0s-.08-.15-.08-.15c-.04-.07-.06-.15-.1-.22-.09-.19-.18-.37-.25-.57-.04-.11-.08-.21-.12-.32-.07-.19-.14-.38-.2-.58-.04-.13-.07-.26-.1-.38-.04-.18-.09-.36-.13-.54-.03-.18-.06-.35-.08-.53-.02-.14-.04-.27-.06-.41,0-.02,0-.04,0-.06l-.03-.48v-.43c0-.69,.06-1.35,.19-2H.2c.07-.34,.4-.57,.74-.5,0,0,.02,0,.03,0,.38,.1,.52,.49,.44,.84l-.02,.06c-.12,.63-.15,1.26-.13,1.9,0,.2,.02,.39,.04,.59,.02,.15,.03,.29,.05,.44,.04,.27,.09,.54,.16,.8,.04,.14,.08,.28,.12,.41,.06,.19,.12,.37,.19,.56,.05,.13,.1,.27,.16,.4,.73,1.68,1.99,3.15,3.71,4.12h.03c.08,.06,.16,.09,.24,.13,.22,.11,.44,.22,.66,.32,.13,.06,.27,.1,.41,.15,.19,.07,.38,.13,.57,.19,.14,.04,.27,.08,.41,.11,.21,.05,.42,.09,.63,.12,.11,.02,.23,.04,.34,.06,.31,.04,.63,.06,.94,.06,3.09,.02,6.1-1.59,7.71-4.47,2.36-4.22,.86-9.55-3.36-11.91C10.35,.17,5.39,1.31,2.82,5h2.81c.35,0,.63,.28,.63,.63s-.28,.63-.63,.63H1.88c-.35,0-.63-.28-.63-.63V1.88c0-.35,.28-.63,.63-.63s.63,.28,.63,.63v1.51C4.4,1.23,7.13,0,10,0c5.52,0,10,4.48,10,10.01,0,5.52-4.48,10-10,10Z"/>`,
  },
  historyFill: {
    body: ` <path d="M20,10.01c0,5.52-4.48,10-10,10h0s0,0,0,0c0,0,0,0,0,0-.01,0-.02,0-.04,0-.36,0-.71-.02-1.06-.06-.11-.01-.21-.03-.32-.05-.26-.04-.52-.08-.77-.14-.12-.03-.24-.06-.36-.09-.24-.06-.47-.13-.7-.21-.12-.04-.24-.09-.36-.13-.22-.09-.44-.18-.66-.28-.08-.04-.16-.06-.24-.1l-.15-.08h0c-1.77-.94-3.23-2.4-4.17-4.17h0s-.08-.15-.08-.15c-.05-.1-.09-.2-.14-.3-.07-.15-.14-.3-.2-.46-.06-.14-.11-.29-.16-.43-.06-.16-.11-.31-.16-.48-.05-.16-.08-.32-.12-.48-.04-.15-.08-.3-.11-.45-.04-.2-.07-.41-.09-.61-.02-.11-.04-.23-.05-.34,0-.02,0-.04,0-.06l-.03-.48v-.43s0,0,0,0,0,0,0,0H0c0-.68,.07-1.35,.2-1.99H.2c.07-.34,.4-.57,.74-.5,0,0,.02,0,.03,0,.38,.1,.52,.49,.44,.84l-.02,.06c-.11,.63-.15,1.26-.13,1.88,0,.2,.02,.41,.04,.61,.01,.14,.03,.28,.05,.42,.04,.29,.1,.58,.17,.86,.03,.11,.06,.21,.1,.32,.06,.22,.14,.43,.22,.64,.04,.11,.09,.23,.13,.34,.73,1.7,2.01,3.19,3.75,4.16,.31,.18,.63,.33,.96,.46,.08,.03,.15,.06,.23,.09,.26,.1,.52,.18,.78,.26,.08,.02,.16,.04,.24,.06,.3,.07,.6,.13,.91,.17,.03,0,.06,.01,.09,.01,.35,.04,.71,.07,1.06,.07,3.07,0,6.05-1.61,7.65-4.47,2.36-4.22,.86-9.55-3.36-11.91C10.35,.17,5.39,1.31,2.82,5h2.81c.35,0,.63,.28,.63,.63s-.28,.63-.63,.63H1.88c-.35,0-.63-.28-.63-.63V1.88c0-.35,.28-.63,.63-.63s.63,.28,.63,.63v1.51C4.4,1.23,7.13,0,10,0c5.52,0,10,4.48,10,10.01Zm-17.5,0h0s0-.03,0-.03c0-.84,.15-1.68,.43-2.48h2.7c.96,0,1.76-.72,1.87-1.67,.11-1.03-.63-1.96-1.66-2.07,2.24-1.5,5.12-1.67,7.53-.47,3.7,1.86,5.2,6.37,3.34,10.07-1.32,2.62-3.96,4.13-6.71,4.13h0c-.06,0-.13,0-.19,0-.17,0-.34-.01-.51-.03-.1,0-.2-.02-.29-.03-.18-.02-.35-.06-.53-.09-.09-.02-.18-.04-.26-.06-.2-.05-.4-.11-.6-.18-.06-.02-.12-.04-.18-.06-.27-.1-.53-.21-.79-.34h0c-1.49-.75-2.6-1.93-3.3-3.31l-.03-.02c-.05-.1-.09-.21-.14-.31-.02-.04-.04-.08-.06-.13-.25-.58-.42-1.19-.51-1.82,0-.06-.02-.11-.02-.17,0-.08-.03-.16-.03-.23l-.02-.39v-.31s0,0,0-.01Zm6.25,1.87c0,.35,.28,.63,.63,.63h3.75c.35,0,.63-.28,.63-.63s-.28-.63-.63-.63h-3.13V6.88c0-.35-.28-.63-.63-.63s-.63,.28-.63,.63v5Z"/>`,
  },
};

type Props = {
  name: keyof typeof iconPacks;
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
