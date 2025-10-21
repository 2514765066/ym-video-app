import { useRef, useState } from "react";
import { Gesture } from "react-native-gesture-handler";

type Direction = "horizontal" | "vertical";

interface GestureData {
  deltaX: number; // 本次水平增量
  deltaY: number; // 本次垂直增量
  directionX: "left" | "right" | null;
  directionY: "up" | "down" | null;
  totalX: number; // 累计水平距离
  totalY: number; // 累计垂直距离
}

export default function (
  cb: (option: GestureData) => void,
  direction: Direction = "horizontal"
) {
  const prevX = useRef(0);
  const prevY = useRef(0);
  const totalX = useRef(0);
  const totalY = useRef(0);
  const [gestureData, setGestureData] = useState<GestureData>({
    deltaX: 0,
    deltaY: 0,
    directionX: null,
    directionY: null,
    totalX: 0,
    totalY: 0,
  });

  const panGesture = Gesture.Pan()
    .runOnJS(true)
    .activeOffsetX(direction == "horizontal" ? [-10, 10] : [-1000, 1000])
    .activeOffsetY(direction == "vertical" ? [-10, 10] : [-1000, 1000])
    .onBegin(e => {
      prevX.current = e.translationX;
      prevY.current = e.translationY;
      totalX.current = 0;
      totalY.current = 0;
      setGestureData({
        deltaX: 0,
        deltaY: 0,
        directionX: null,
        directionY: null,
        totalX: 0,
        totalY: 0,
      });
    })
    .onUpdate(e => {
      const deltaX = e.translationX - prevX.current;
      const deltaY = e.translationY - prevY.current;
      prevX.current = e.translationX;
      prevY.current = e.translationY;

      totalX.current += deltaX;
      totalY.current += deltaY;

      setGestureData({
        deltaX,
        deltaY,
        directionX: deltaX > 0 ? "right" : deltaX < 0 ? "left" : null,
        directionY: deltaY > 0 ? "down" : deltaY < 0 ? "up" : null,
        totalX: totalX.current,
        totalY: totalY.current,
      });

      cb(gestureData);
    });

  return panGesture;
}
