import { historyState, updateProgress } from "@/store/useHistoryStore";
import Video, { OnLoadData, OnProgressData } from "react-native-video";
import { useSnapshot } from "valtio";
import { videoRef } from "../store/useEl";
import { play, playStore } from "../store/usePlay";
import { progressStore, resetProgress, seekTo } from "../store/useProgress";
import { rateStore } from "../store/useRate";
import { volumeStore } from "../store/useVolume";
import useM3u8 from "../hooks/useM3u8";
import { updateLoading } from "../store/useVideo";

export default function () {
  const { isPlay } = useSnapshot(playStore);
  const { rate } = useSnapshot(rateStore);
  const { volume } = useSnapshot(volumeStore);
  const { selectedHistory, selectedProgress } = useSnapshot(historyState);

  const { uri } = useM3u8(selectedHistory.url[selectedHistory.history].url, [
    selectedHistory.history,
  ]);

  //视频加载完成
  const onLoad = ({ duration }: OnLoadData) => {
    updateProgress({
      duration,
    });

    progressStore.duration = duration;

    if (selectedProgress?.currentTime) {
      seekTo(selectedProgress.currentTime);
    }

    play();
  };

  //视频播放进度
  const onProgress = ({ currentTime }: OnProgressData) => {
    if (!isPlay) return;

    updateProgress({
      currentTime,
    });

    progressStore.currentTime = currentTime;
  };

  const onLoadStart = () => {
    resetProgress();

    updateLoading(true);
  };

  if (!uri) {
    return null;
  }

  return (
    <Video
      rate={rate}
      volume={volume / 100}
      paused={!isPlay}
      ref={videoRef}
      source={{
        uri,
        bufferConfig: {
          maxBufferMs: 1000 * 60 * 5,
          cacheSizeMB: 200,
        },
      }}
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#000",
      }}
      resizeMode="cover"
      onLoad={onLoad}
      onProgress={onProgress}
      onBuffer={({ isBuffering }) => updateLoading(isBuffering)}
      onLoadStart={onLoadStart}
    />
  );
}
