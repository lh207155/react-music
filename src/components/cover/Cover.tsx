import { Box, Typography } from "@mui/material";
import { useSelector } from "../../redux/hooks";
import coverDefault from "../../assets/record.png";

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
          src={
            currentSong?.al?.picUrl ||
            currentSong?.album?.picUrl ||
            coverDefault
          }
          alt=""
          height={60}
          style={{ borderRadius: "5px", marginTop: "10px" }}
        />
      </Box>
      {/* 歌手信息 */}
      {(currentSong?.ar || currentSong?.artists) && (
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
            <Typography>
              {currentSong?.ar[0]?.name
                ? currentSong.ar[0].name
                : currentSong.artists[0].name}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Cover;
