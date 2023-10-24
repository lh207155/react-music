import logo from "../../assets/logo.png";
import { Box, Button, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import Search from "../search/Search";

const Header = () => {
  const nav = useNavigate();
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
      {/* navButton */}
      <Box
        style={{
          height: "70px",
          lineHeight: "78px",
          fontSize: "20px",
          marginLeft: "10px",
          color: "white",
          fontWeight: 700,
          display: "flex",
        }}
      >
        <Button
          onClick={() => {
            nav(-1);
          }}
        >
          <ArrowBackIosNewIcon sx={{ color: "white" }} />
        </Button>
        <Button
          onClick={() => {
            nav(1);
          }}
        >
          <ArrowForwardIosIcon sx={{ color: "white" }} />
        </Button>
      </Box>
      {/* 搜索框 */}
      <Box>
        <Search></Search>
      </Box>
    </Box>
  );
};

export default Header;
