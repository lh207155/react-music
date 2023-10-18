import { Box, Divider, Typography } from "@mui/material";
import { CSSProperties } from "react";
import { useSelector, useDispatch } from "../../redux/hooks";
import { playControllerSlice } from "../../redux/playController/slice";
import { Song } from "../../redux/playList/slice";
import cssStyles from "./PlayList.module.css";
interface Props {
  styles: CSSProperties;
}

const PlayList = ({ styles }: Props) => {
  const playListState = useSelector((state) => state.playList);
  const dispatch = useDispatch();
  const handleSelect = async (i: Song) => {
    await dispatch(playControllerSlice.actions.selectSong(i));
    dispatch(playControllerSlice.actions.playSong());
  };
  return (
    <Box
      style={{ ...styles }}
      sx={{
        height: "100%",
        width: "500px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgb(250,250,250)",
        backdropFilter: "blur(10px)",
        boxShadow: "10px 0 10px black",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <Box>
        <Typography sx={{ fontSize: "20px", fontWeight: 700 }}>
          当前播放
        </Typography>
        <Typography
          component="span"
          sx={{ fontSize: "12px", color: "gray" }}
        >{`共${playListState.list.length}首`}</Typography>
        <Typography
          component="span"
          sx={{ color: "blue", fontSize: "12px", float: "right" }}
        >
          清空列表
        </Typography>
      </Box>
      <Divider sx={{ margin: "10px 0" }}></Divider>
      <Box sx={{ flex: 1, height: "100%" }}>
        <ul className={cssStyles.ulStyle}>
          {playListState.list.map((i) => (
            <li
              key={i.name}
              onClick={() => {
                handleSelect(i);
              }}
            >
              {i.name}
            </li>
          ))}
        </ul>
      </Box>
    </Box>
  );
};

export default PlayList;
