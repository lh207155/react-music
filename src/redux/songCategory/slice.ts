import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/http";

interface SongCategory {
  id: number;
  name: string;
  hot: boolean;
}
interface SongCategories {
  loading: boolean;
  error: string | unknown;
  songCategories: SongCategory[];
}
const initialState: SongCategories = {
  loading: true,
  error: null,
  songCategories: [],
};
export const fetch = createAsyncThunk("songCategory/fetch", async () => {
  const { data } = await axios.get("/playlist/hot");
  return data;
});
export const songCategorySlice = createSlice({
  name: "songCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetch.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetch.fulfilled, (state, action) => {
      state.songCategories = action.payload;
      state.loading = false;
    });
    builder.addCase(fetch.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
