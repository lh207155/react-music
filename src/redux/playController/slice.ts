import { createSlice } from "@reduxjs/toolkit";
import { Song } from "../playList/slice";
import { PayloadAction } from "@reduxjs/toolkit";
interface PlayState {
  playListIsOpen: boolean;
  currentSong?: Song;
  volume: number;
  status: "play" | "pause";
}

const initialState: PlayState = {
  playListIsOpen: false,
  volume: 0.5,

  status: "pause",
};

// 添加一首歌曲到播放器里
const selectSong = (state: PlayState, action: PayloadAction<Song>) => {
  state.currentSong = action.payload;
};

// 切换播放列表页展示开关
const switchPlayList = (state: PlayState) => {
  state.playListIsOpen = !state.playListIsOpen;
};

// 播放当前播放器里的歌曲（如果播放器里有歌曲的话）
const playSong = (state: PlayState) => {
  if (!state.currentSong?.resourceURL) return;

  state.status = "play";
};
// 调整音量
const slideVolume = (state: PlayState, action: PayloadAction<number>) => {
  state.volume = action.payload;
};

// 播放和暂停
const switchPlayer = (
  state: PlayState,
  action: PayloadAction<typeof initialState.status>
) => {
  state.status = action.payload;
};

// 当前播放器里的歌曲在加载完元数据时修正时长,防止api获取的时长不正确
const correctTime = (
  state: PlayState,
  action: PayloadAction<number | null>
) => {
  if (!state.currentSong || action.payload === null) return;

  state.currentSong.time = action.payload;
};
export const playControllerSlice = createSlice({
  name: "playController",
  initialState,
  reducers: {
    switchPlayList,
    selectSong,
    playSong,
    slideVolume,
    switchPlayer,
    correctTime,
  },
  extraReducers: {},
});
