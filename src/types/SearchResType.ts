import { SongType } from "./songType";

export type SearchResType = {
  result: {
    songs: SongType[];
    hasMore: boolean;
    songCount: number;
  };
  code: number;
};
