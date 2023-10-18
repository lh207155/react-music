import { useState } from "react";
import axios from "../services/http";

interface SongListDetailType {
  id: number;
  name: string;
}
export const useSongListDetail = () => {
  const [songListDetail, setSongListDetail] = useState<SongListDetailType[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSongListDetail = (songListID: number | string) => {
    axios
      .get(`/playlist/detail?id=${songListID}`)
      .then(({ data }) => {
        setSongListDetail(data.playlist.tracks);
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
