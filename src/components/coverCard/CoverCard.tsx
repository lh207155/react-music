import React from "react";
import { Box, Typography } from "@mui/material";
interface SongList {
  imgURL: string;
  title: string;
  link: string;
}
const CoverCard: React.FC<SongList> = ({ imgURL, link, title }) => {
  return (
    <Box sx={{ marginRight: "10px" }}>
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
