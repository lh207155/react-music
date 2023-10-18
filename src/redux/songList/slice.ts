import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../services/http";

interface SongList {
  loading: boolean;
  error: string | unknown;
  data: unknown[];
}
const initialState: SongList = {
  loading: true,
  error: "",
  data: [],
};

export const fetch = createAsyncThunk("songList/fetch", async () => {
  try {
    const { data } = await axios.get("/top/playlist/highquality");
    return data;
  } catch (error) {
    return error instanceof Error && error.message;
  }
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
      state.error = action.payload;
      state.loading = false;
    });
  },
});
