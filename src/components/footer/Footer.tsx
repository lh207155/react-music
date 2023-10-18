import { Box } from "@mui/material";
import Cover from "../cover/Cover";
import Player from "../player/Player";
import Settings from "../settings/Settings";

const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        backgroundColor: "rgb(245,245,245)",
        borderTop: "1px solid rgb(230,230,230)",
      }}
    >
      <Cover />
      <Player />
      <Settings />
    </Box>
  );
};

export default Footer;
