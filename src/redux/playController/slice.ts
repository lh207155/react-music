import { createSlice } from "@reduxjs/toolkit";
import { SongType } from "../../types/songType";
import { PayloadAction } from "@reduxjs/toolkit";
import { addSongsToPlayList } from "../playList/slice";

interface PlayState {
  playListIsOpen: boolean;
  currentSong: SongType;
  volume: number;
  status: "play" | "pause";
  error: unknown;
  loading: boolean;
}

const initialState: PlayState = {
  loading: true,
  playListIsOpen: false,
  volume: 0.5,
  currentSong: {
    artists: [{ id: 0, name: "" }],
    album: {
      id: 0,
      name: "",
      picUrl: "",
    },
    name: "",
    id: 0,
    dt: 0,
    resourceURL: "",
    ar: [{ id: 0, name: "" }],
    al: {
      id: 0,
      name: "",
      picUrl: "",
    },

    duration: 0,
  },
  status: "pause",
  error: null,
};

// 添加一首歌曲到播放器里
const selectSong = (state: PlayState, action: PayloadAction<SongType>) => {
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
      state.currentSong = action.payload as SongType;
      state.loading = false;
    });
    builder.addCase(addSongsToPlayList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addSongsToPlayList.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});
