export type SongType = {
  name: string;
  id: number;
  ar: { id: number; name: string }[];
  al: {
    id: number;
    name: string;
    picUrl: string;
  };
  dt: number;
  artists: { id: number; name: string }[];
  album: {
    id: number;
    name: string;
    picUrl: string;
  };
  resourceURL: string;
  duration: number;
};
