import { useState } from "react";
import axios from "../services/http";
import { SearchResType } from "../types/SearchResType";

export const useSearch = () => {
  const [songList, setSongList] = useState<SearchResType>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSearchSongs = (keyword: string) => {
    axios
      .get(`/searchNew?keywords=${keyword}`)
      .then(({ data }) => {
        setSongList(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return {
    songList,
    setSongList,
    loading,
    setLoading,
    error,
    setError,
    fetchSearchSongs,
  };
};
