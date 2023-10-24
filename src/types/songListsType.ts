export interface SongListDetailType {
  code: number;
  playlists: {
    id: number;
    name: string;

    coverImgUrl: string;
  }[];
}
