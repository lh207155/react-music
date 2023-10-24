import axios from "../../services/http";
import { createSlice } from "@reduxjs/toolkit";
import { SongType } from "../../types/songType";
import { createAppAsyncThunk } from "../hooks";

interface PlayList {
  loading: boolean;
  error: string | null;
  list: SongType[];
}

const initialState: PlayList = {
  loading: true,
  error: null,
  list: [
    {
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
  ],
};
// const addSongsToPlayList = (state: PlayList, action: { payload: Song }) => {
//   if (state.list.find((i) => i.id === action.payload.id)) return;
//   state.list.push(action.payload);
// };

export const addSongsToPlayList = createAppAsyncThunk(
  "playController/addSongsToPlayList",
  async (song: SongType, thunkAPI) => {
    const state = thunkAPI.getState().playList;
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
      state.list[0].id === 0 && state.list.pop();
      state.list.push(action.payload as SongType);
    });
  },
});
