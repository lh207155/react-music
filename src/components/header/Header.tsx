import React from "react";
import logo from "../../assets/logo.png";
import { Box, Typography } from "@mui/material";

const Header = () => {
  return (
    <Box sx={{ display: "flex", backgroundColor: "rgb(236,65,65)" }}>
      <Box>
        <img
          src={logo}
          alt="logo"
          height={50}
          width={50}
          style={{ marginTop: "10px", marginLeft: "10px" }}
        />
      </Box>
      <Typography
        style={{
          height: "70px",
          lineHeight: "70px",
          fontSize: "20px",
          marginLeft: "10px",
          color: "white",
          fontWeight: 500,
        }}
      >
        网易云音乐
      </Typography>
    </Box>
  );
};

export default Header;
