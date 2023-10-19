import { createSlice } from "@reduxjs/toolkit";
import { SongType } from "../../types/songType";
import { PayloadAction } from "@reduxjs/toolkit";
import { addSongsToPlayList } from "../playList/slice";

export interface Song extends SongType {
  resourceURL: string;
}
interface PlayState {
  playListIsOpen: boolean;
  currentSong: Song;
  volume: number;
  status: "play" | "pause";
  error: unknown;
}

const initialState: PlayState = {
  playListIsOpen: false,
  volume: 0.5,
  currentSong: {
    resourceURL: "",
  } as Song,
  status: "pause",
  error: null,
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

  state.currentSong.dt = action.payload;
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
  extraReducers: (builder) => {
    // builder.addCase(selectSong.fulfilled, (state, action) => {
    //   state.currentSong = action.payload;
    // });
    // builder.addCase(selectSong.rejected, (state, action) => {
    //   state.error = action.payload;
    // });

    builder.addCase(addSongsToPlayList.fulfilled, (state, action) => {
      state.currentSong = action.payload;
    });
  },
});
