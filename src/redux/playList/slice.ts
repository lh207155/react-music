import axios from "../../services/http";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Song } from "../playController/slice";

interface PlayList {
  loading: boolean;
  error: string | null;
  list: Song[];
}

const initialState: PlayList = {
  loading: true,
  error: null,
  list: [{} as Song],
};
// const addSongsToPlayList = (state: PlayList, action: { payload: Song }) => {
//   if (state.list.find((i) => i.id === action.payload.id)) return;
//   state.list.push(action.payload);
// };

export const addSongsToPlayList = createAsyncThunk(
  "playController/addSongsToPlayList",
  async (song: Song, thunkAPI) => {
    const state = thunkAPI.getState().playList;
    console.log(state);
    if (state.list.find((i) => i.id === song.id)) return;
    const { data: data_1 } = await axios.get(`/song/url?id=${song.id}`);
    return {
      ...song,
      resourceURL: data_1.data[0].url,
    };
  }
);
export const playListSlice = createSlice({
  name: "playList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addSongsToPlayList.fulfilled, (state, action) => {
      console.log(state.list);
      state.list.push(action.payload);
    });
  },
});
