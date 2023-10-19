import "./App.css";
import { Alert, Box, Container, Grid } from "@mui/material";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import PlayList from "./components/playList/PlayList";
import { Height } from "@mui/icons-material";
import Sider from "./components/sider/Sider";
import Content from "./components/content/Content";
import { RouterProvider, BrowserRouter, Outlet } from "react-router-dom";
import router from "./router";

function App() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* <Alert severity="warning" sx={{ position: "fixed", top: 0, left: "40%" }}>
        This is a warning alert — check it out!
      </Alert> */}
      <Header></Header>
      <Box sx={{ flex: 1, display: "flex" }}>
        <Sider></Sider>
        <Box sx={{ flex: 1, position: "relative" }}>
          <Outlet />
          <PlayList />
        </Box>
      </Box>
      <Footer></Footer>
    </Box>
  );
}

export default App;
