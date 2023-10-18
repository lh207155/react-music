import { createSlice } from "@reduxjs/toolkit";

export interface Song {
  id: number;
  time: number;
  name: string;
  artist: string;
  coverURL: string;
  resourceURL: string | null | undefined;
}

interface PlayList {
  loading: boolean;
  error: string | null;
  list: Song[];
}

const initialState: PlayList = {
  loading: true,
  error: null,
  list: [
    {
      id: 33894312,
      name: "流光过隙",
      time: 104000,
      artist: "mihoyo",
      coverURL: "",
      resourceURL:
        "../../../public/obj_wo3DlMOGwrbDjj7DisKw_30321528146_c90f_7238_d2e8_b920b697042bf371f183e65426eb64ee.mp3",
    },
  ],
};
const addSongsToPlayList = (state: PlayList, action: { payload: Song }) => {
  state.list.push(action.payload);
};

export const playListSlice = createSlice({
  name: "playList",
  initialState,
  reducers: { addSongsToPlayList },
  extraReducers: {},
});
