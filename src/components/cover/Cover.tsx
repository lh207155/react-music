import { Box, Typography } from "@mui/material";
import cover from "../../assets/cover.jpg";
import React from "react";
import { useSelector } from "../../redux/hooks";

const Cover = () => {
  const currentSong = useSelector((state) => state.playController.currentSong);
  return (
    // 封面部分
    <Box sx={{ display: "flex", height: "85px", width: "25%" }}>
      {/* 封面图片 */}
      <Box
        sx={{
          height: "85px",
          width: "85px",
          textAlign: "center",
        }}
      >
        <img
          src={cover}
          alt=""
          height={60}
          style={{ borderRadius: "5px", marginTop: "10px" }}
        />
      </Box>
      {/* 歌手信息 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box>
          <Typography component="span">
            {currentSong ? currentSong.name : ""}
          </Typography>
          <Typography component="span">收藏</Typography>
        </Box>
        <Box>
          <Typography>{currentSong ? currentSong.artist : ""}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Cover;
