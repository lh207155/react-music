import { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useSongListDetail } from "../../hooks/useSongListDetail";
import { useParams } from "react-router-dom";
import styles from "./SongList.module.css";
import { useDispatch } from "../../redux/hooks";
import { addSongsToPlayList } from "../../redux/playList/slice";
import { playControllerSlice } from "../../redux/playController/slice";
import { SongType } from "../../types/songType";

const SongList = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const { fetchSongListDetail, songListDetail, loading, error } =
    useSongListDetail();

  const addSongAndPlay = async (i: SongType) => {
    await dispatch(addSongsToPlayList(i));
    dispatch(playControllerSlice.actions.playSong());
  };

  useEffect(() => {
    params.id && fetchSongListDetail(params.id);
  }, []);

  if (loading || error || !songListDetail) return;
  return (
    <Box
      sx={{
        padding: "20px",
        boxSizing: "border-box",
        maxHeight: "calc(100vh - 155px)",
        overflow: "auto",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <img
          src={songListDetail.playlist.coverImgUrl}
          height={180}
          width={180}
        />
        <Box>
          <Typography component="p">
            治愈纯音乐｜人间温柔 聆听时光静好
          </Typography>
          <Box>
            <Button>播放全部</Button>
          </Box>
        </Box>
      </Box>
      <Box sx={{ marginTop: "20px" }}>
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
            {songListDetail.playlist.tracks.map((i) => (
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
                    <span>{i.ar[0].name}</span>
                  </div>
                </td>
                <td>
                  <div style={{ height: "40px" }}>
                    <span>{i.al.name}</span>
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

export default SongList;
