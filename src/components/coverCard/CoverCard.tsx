import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface SongList {
  imgURL: string;
  title: string;
  id: number;
}
const CoverCard: React.FC<SongList> = ({ imgURL, id, title }) => {
  const nav = useNavigate();
  return (
    <Box
      sx={{ marginRight: "10px", cursor: "pointer" }}
      onClick={() => {
        nav(`/songListDetail/${id}`);
      }}
    >
      <img src={imgURL} alt="cover" height={"140px"} width={"140px"} />
      <Typography
        sx={{
          width: "140px",
          height: "45px",
          // whiteSpace: "nowrap",
          overflow: "hidden",
          // textOverflow: "ellipsis",
          fontSize: "14px",
          // display: "-webkit-box",
          // WebkitLineClamp: 2,
          // WebkitBoxOrient: "vertical",
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default CoverCard;
