import { useEffect } from "react";
import { Box, Button } from "@mui/material";
import styles from "../songList/SongList.module.css";
import { playControllerSlice } from "../../redux/playController/slice";
import { addSongsToPlayList } from "../../redux/playList/slice";
import { useDispatch } from "../../redux/hooks";
import { useParams } from "react-router-dom";
import { useSearch } from "../../hooks/useSearch";
import { SongType } from "../../types/songType";
import DataError from "../dataError/DataError";

const SearchList = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { songList, loading, fetchSearchSongs } = useSearch();
  const addSongAndPlay = async (i: SongType) => {
    const j = {
      ...i,
      al: { name: i.album.name, id: i.album.id, picUrl: i.album.picUrl },
      ar: [{ name: i.artists[0].name, id: i.artists[0].id }],
      dt: i.duration,
    };
    await dispatch(addSongsToPlayList(j));
    dispatch(playControllerSlice.actions.playSong());
  };
  useEffect(() => {
    fetchSearchSongs(params.keywords as string);
  }, [params.keywords]);

  if (loading || !songList) return;
  if (!songList.result.songs) return DataError();
  return (
    <Box
      sx={{
        padding: "20px",
        boxSizing: "border-box",
        maxHeight: "calc(100vh - 155px)",
        overflow: "auto",
      }}
    >
      <Box>
        <table width="100%" cellSpacing={0}>
          <thead>
            <tr
              style={{
                backgroundColor: "white",
                textAlign: "left",
                color: "gray",
              }}
            >
              <td>
                <p style={{ height: "20px" }}>歌曲名</p>
              </td>
              <td>
                <p style={{ height: "20px" }}>歌手</p>
              </td>
              <td>
                <p style={{ height: "20px" }}>专辑</p>
              </td>
              <td>
                <p style={{ height: "20px" }}>操作</p>
              </td>
            </tr>
          </thead>
          <tbody>
            {songList.result.songs.map((i) => (
              <tr
                className={styles["tr:nth-child(odd)"]}
                key={i.id}
                style={{ lineHeight: "40px" }}
              >
                <td>
                  <div style={{ height: "40px" }}>
                    <span
                      onClick={() => {
                        addSongAndPlay(i);
                      }}
                    >
                      {i.name}
                    </span>
                  </div>
                </td>
                <td>
                  <div style={{ height: "40px" }}>
                    <span>{i.artists[0].name}</span>
                  </div>
                </td>
                <td>
                  <div style={{ height: "40px" }}>
                    <span>{i.album.name}</span>
                  </div>
                </td>
                <td>
                  <div style={{ height: "40px" }}>
                    <Button>添加到播放列表</Button>
                    <Button>添加到收藏</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Box>
  );
};

export default SearchList;
