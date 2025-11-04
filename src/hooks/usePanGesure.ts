import { useRef, useState } from "react";
import { Gesture } from "react-native-gesture-handler";

type Direction = "horizontal" | "vertical";

interface GestureData {
  deltaX: number; // 本次水平增量
  deltaY: number; // 本次垂直增量
}

export default function (
  cb: (option: GestureData) => void,
  direction: Direction = "horizontal"
) {
  const prevX = useRef(0);
  const prevY = useRef(0);
  const [gestureData, setGestureData] = useState<GestureData>({
    deltaX: 0,
    deltaY: 0,
  });

  const panGesture = Gesture.Pan()
    .runOnJS(true)
    .activeOffsetX(direction == "horizontal" ? [-5, 5] : [-1000, 1000])
    .activeOffsetY(direction == "vertical" ? [-5, 5] : [-1000, 1000])
    .onBegin(e => {
      prevX.current = e.translationX;
      prevY.current = e.translationY;
      setGestureData({
        deltaX: 0,
        deltaY: 0,
      });
    })
    .onUpdate(e => {
      const deltaX = e.translationX - prevX.current;
      const deltaY = e.translationY - prevY.current;
      prevX.current = e.translationX;
      prevY.current = e.translationY;

      setGestureData({
        deltaX,
        deltaY,
      });

      cb(gestureData);
    });

  return panGesture;
}
