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
  tags: SongCategory[];
}
const initialState: SongCategories = {
  loading: true,
  error: null,
  tags: [
    {
      id: 0,
      name: "",
      hot: false,
    },
  ],
};
export const fetch = createAsyncThunk("songCategory/fetch", async () => {
  return axios
    .get("/playlist/hot")
    .then(({ data }) => data.tags)
    .catch((e) => {
      throw new Error(e.message);
    });
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
      state.tags = action.payload;
      state.loading = false;
    });
    builder.addCase(fetch.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
