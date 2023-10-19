import { useEffect } from "react";
import styles from "./Content.module.css";
import { Box } from "@mui/material";
import { useSelector, useDispatch } from "../../redux/hooks";
import CoverCard from "../coverCard/CoverCard";
import { fetch as fetchSongCategory } from "../../redux/songCategory/slice";
import { fetch as fetchSongList } from "../../redux/songList/slice";

const resource = [
  { label: "网易云音乐", key: 1 },
  { label: "qq音乐", key: 2 },
  { label: "酷狗音乐", key: 3 },
  { label: "哔哩哔哩", key: 4 },
  { label: "咪咕音乐", key: 5 },
];

const Content = () => {
  const { songCategory, songList } = useSelector((state) => state);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSongCategory());
    dispatch(fetchSongList());
  }, []);

  return (
    <Box
      sx={{
        height: "calc(100vh - 155px)",
        overflow: "auto",
        padding: "20px",
        boxSizing: "border-box !important",
      }}
    >
      {/* 音乐源 */}
      <Box>
        <ul className={styles.ulstyle}>
          {resource.map((i) => (
            <li key={i.key} className={styles.musicResourceList}>
              {i.label}
            </li>
          ))}
        </ul>
      </Box>
      {/* 音乐风格 */}
      <Box>
        {!songCategory.loading && (
          <ul className={styles.ulstyle}>
            {songCategory.songCategories.tags.map((i) => (
              <li key={i.id} className={styles.musicStyleList}>
                {i.name}
              </li>
            ))}
          </ul>
        )}
      </Box>
      {/* 歌单列表 */}
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {!songList.loading &&
          songList.data.playlists.map((i) => (
            <CoverCard
              key={i.id}
              imgURL={i.coverImgUrl}
              title={i.name}
              id={i.id}
            />
          ))}
      </Box>
    </Box>
  );
};

export default Content;
