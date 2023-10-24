import { useState } from "react";
import axios from "../services/http";
import { SongType } from "../types/songType";
interface SongListDetail {
  playlist: {
    id: number;
    name: string;
    coverImgUrl: string;
    tracks: SongType[];
  };
}
export const useSongListDetail = () => {
  const [songListDetail, setSongListDetail] = useState<SongListDetail>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSongListDetail = (songListID: number | string) => {
    axios
      .get(`/playlist/detail?id=${songListID}`)
      .then(({ data }) => {
        setSongListDetail(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    songListDetail,
    setSongListDetail,
    loading,
    setLoading,
    error,
    setError,
    fetchSongListDetail,
  };
};
