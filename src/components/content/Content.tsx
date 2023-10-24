import { useEffect } from "react";
import styles from "./Content.module.css";
import { Box } from "@mui/material";
import { useSelector, useDispatch } from "../../redux/hooks";
import CoverCard from "../coverCard/CoverCard";
import { fetch as fetchSongCategory } from "../../redux/songCategory/slice";
import { fetch as fetchSongList } from "../../redux/songList/slice";
import DataError from "../dataError/DataError";

const resource = [
  { label: "网易云音乐", key: 1 },
  { label: "qq音乐", key: 2 },
  { label: "酷狗音乐", key: 3 },
  { label: "哔哩哔哩", key: 4 },
  { label: "咪咕音乐", key: 5 },
];

const Content = () => {
  const {
    loading: loading1,
    tags: data1,
    error: error1,
  } = useSelector((state) => state.songCategory);
  const {
    loading: loading2,
    data: data2,
    error: error2,
  } = useSelector((state) => state.songList);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSongCategory());
    dispatch(fetchSongList());
  }, []);

  if (loading1 || loading2) {
    return <p>加载数据中</p>;
  }
  if (error1 || error2) {
    return DataError();
  }
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
        {!loading1 && (
          <ul className={styles.ulstyle}>
            {data1.map((i) => (
              <li key={i.id} className={styles.musicStyleList}>
                {i.name}
              </li>
            ))}
          </ul>
        )}
      </Box>
      {/* 歌单列表 */}
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {!loading2 &&
          data2.playlists.map((i) => (
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
