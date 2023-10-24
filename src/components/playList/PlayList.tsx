import { Box, Divider, Typography } from "@mui/material";
import { useSelector, useDispatch } from "../../redux/hooks";
import { playControllerSlice } from "../../redux/playController/slice";
import { SongType } from "../../types/songType";
import cssStyles from "./PlayList.module.css";

const PlayList = () => {
  const playListState = useSelector((state) => state.playList);
  const { playListIsOpen } = useSelector((state) => state.playController);
  const dispatch = useDispatch();
  const handleSelect = async (i: SongType) => {
    await dispatch(playControllerSlice.actions.selectSong(i));
    dispatch(playControllerSlice.actions.playSong());
  };
  return (
    <Box
      sx={{
        height: "100%",
        width: "500px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgb(250,250,250)",
        padding: "20px",
        boxSizing: "border-box",
      }}
      className={`${cssStyles.playList} ${
        playListIsOpen ? cssStyles["slide-in"] : cssStyles["slide-out"]
      }`}
    >
      <Box>
        <Typography sx={{ fontSize: "20px", fontWeight: 700 }}>
          当前播放
        </Typography>
        <Typography
          component="span"
          sx={{ fontSize: "12px", color: "gray" }}
        >{`共${
          playListState.list[0].id === 0 ? "0" : playListState.list.length
        }首`}</Typography>
        <Typography
          component="span"
          sx={{ color: "blue", fontSize: "12px", float: "right" }}
        >
          清空列表
        </Typography>
      </Box>
      <Divider sx={{ margin: "10px 0" }}></Divider>
      {playListState.list[0].id !== 0 && (
        <Box sx={{ flex: 1, height: "100%" }}>
          <ul className={cssStyles.ulStyle}>
            {playListState.list.map((i) => (
              <li
                key={i.id}
                onClick={() => {
                  handleSelect(i);
                }}
              >
                {i.name}
              </li>
            ))}
          </ul>
        </Box>
      )}
    </Box>
  );
};

export default PlayList;
