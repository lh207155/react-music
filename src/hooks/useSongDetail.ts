import { useState } from "react";
import axios from "../services/http";

export const useSongUrl = () => {
  const [songUrl, setSongUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSongUrl = (songID: number | string) => {
    axios
      .get(`/song/url?id=${songID}`)
      .then(({ data }) => {
        setSongUrl(data.data[0].url);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return {
    songUrl,
    setSongUrl,
    loading,
    setLoading,
    error,
    setError,
    fetchSongUrl,
  };
};

// import { useData } from "./useData";
// import { SongType } from "../types/songType";

// const { data,error,loading, fetData } = useData<SongType>()

// export const useCoverUrl = () => {
//   const [songCoverUrl, setSongCoverUrl] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchSongCoverUrl = (songID: number | string) => {
//     axios
//       .get(`/song/detail?ids=${songID}`)
//       .then(({ data }) => {
//         setSongCoverUrl(data.songs[0]);
//       })
//       .catch((error) => {
//         setError(error.message);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };
//   return {
//     songCoverUrl,
//     setSongCoverUrl,
//     loading,
//     setLoading,
//     error,
//     setError,
//     fetchSongCoverUrl,
//   };
// };
