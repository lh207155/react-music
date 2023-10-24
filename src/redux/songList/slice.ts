import axios from "../../services/http";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SongListDetailType } from "../../types/songListsType";

interface SongList {
  loading: boolean;
  error: string | unknown;
  data: SongListDetailType;
}
const initialState: SongList = {
  loading: true,
  error: "",
  data: {
    code: 0,
    playlists: [
      {
        id: 0,
        name: "",
        coverImgUrl: "",
      },
    ],
  },
};

export const fetch = createAsyncThunk("songList/fetch", async () => {
  return axios.get("/top/playlist/highquality").then(({ data }) => data);
  // .catch((e) => e.message);
});
export default createSlice({
  name: "songList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetch.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetch.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(fetch.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
  },
});
