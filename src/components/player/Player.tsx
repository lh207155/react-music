import { Box, Slider, Typography } from "@mui/material";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import FastForwardIcon from "@mui/icons-material/FastForward";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "../../redux/hooks";
import { playControllerSlice } from "../../redux/playController/slice";

const Player = () => {
  const [process, setPorcess] = useState(0);

  const [time, setTime] = useState(0);
  const endTime = `${Math.floor(time / 1000 / 60)}:${
    Math.floor(time / 1000) % 60 > 9
      ? Math.floor(time / 1000) % 60
      : `0${Math.floor(time / 1000) % 60}`
  }`;
  const startTime = `${Math.floor(((process / 100) * time) / 1000 / 60)}:${
    Math.floor(((process / 100) * time) / 1000) % 60 > 9
      ? Math.floor(((process / 100) * time) / 1000) % 60
      : `0${Math.floor(((process / 100) * time) / 1000) % 60}`
  }`;

  const { currentSong, status, volume } = useSelector((s) => s.playController);
  const diapatch = useDispatch();
  const ref = useRef<HTMLAudioElement>(null);
  const player = ref.current;

  useEffect(() => {
    syncPlayerStatus(status);
  }, [status, currentSong]);

  useEffect(() => {
    if (player) player.volume = volume;
  }, [volume]);

  // 滑动进度条
  const sliderChange = (value: number) => {
    if (!currentSong) return;
    // 拖动时先暂停播放防止卡顿
    syncPlayerStatus("pause");
    setPorcess(value);
    if (player && time) {
      player.currentTime = (value / 100) * (time / 1000);
    }
  };
  // 同步播放状态
  const syncPlayerStatus = (type: "play" | "pause") => {
    if (!currentSong.resourceURL) return;
    player?.[type]();
    // 避免大量dispatch
    status !== type && diapatch(playControllerSlice.actions.switchPlayer(type));
  };
  // 歌曲播放完毕
  const onEnded = () => {
    if (status === "pause") return;
    syncPlayerStatus("pause");
    if (player) player.currentTime = 0;
  };

  // 修正歌曲时长
  const CorrectTime = () => {
    if (!player) return;
    setTime(player?.duration * 1000 || 0);
  };
  // 歌曲播放，进度条跟随
  const sliding = () => {
    if (!player || !time) return;
    setPorcess((player?.currentTime / (time / 1000)) * 100);
  };
  return (
    <Box sx={{ textAlign: "center", width: "50%", height: "85px" }}>
      <Box sx={{ height: "60%" }}>
        <FastRewindIcon sx={{ height: "100%", fontSize: "40px !important" }} />
        {status === "pause" ? (
          <PlayArrowIcon
            sx={{
              height: "100%",
              fontSize: "40px !important",
              margin: "0 30px",
            }}
            onClick={() => {
              syncPlayerStatus("play");
            }}
          />
        ) : (
          <PauseIcon
            sx={{
              height: "100%",
              fontSize: "40px !important",
              margin: "0 30px",
            }}
            onClick={() => {
              syncPlayerStatus("pause");
            }}
          />
        )}

        <FastForwardIcon sx={{ height: "100%", fontSize: "40px !important" }} />
      </Box>
      <Box sx={{ height: "40%", position: "relative" }}>
        <Slider
          disabled={!currentSong.resourceURL}
          size="small"
          defaultValue={0}
          value={process}
          aria-label="Small"
          sx={{ color: "red" }}
          step={0.5}
          max={100}
          min={0}
          onChange={(_, value) => {
            sliderChange(value as number);
          }}
          onChangeCommitted={() => {
            syncPlayerStatus("play");
          }}
        />
        <Typography
          sx={{
            position: "absolute",
            top: "-12px",
            left: "0",
            fontSize: "12px",
            color: "GrayText",
            fontFamily: "system-ui, 'PingFang SC', STHeiti, sans-serif;",
          }}
        >
          {startTime}
        </Typography>
        <Typography
          sx={{
            position: "absolute",
            top: "-12px",
            right: "0",
            fontSize: "12px",
            color: "GrayText",
            fontFamily: "system-ui, 'PingFang SC', STHeiti, sans-serif;",
          }}
        >
          {endTime}
        </Typography>
      </Box>
      <audio
        src={currentSong?.resourceURL || ""}
        id="audio"
        ref={ref}
        hidden
        onTimeUpdate={sliding}
        onEnded={onEnded}
        onLoadedMetadata={CorrectTime}
      ></audio>
    </Box>
  );
};

export default Player;
