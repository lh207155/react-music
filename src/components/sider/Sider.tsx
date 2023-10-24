import { Box, List, ListItemButton } from "@mui/material";

const menu = [
  {
    label: "发现音乐",
    key: 1,
  },
  {
    label: "我喜爱的音乐",
    key: 2,
  },
  { label: "最近播放", key: 3 },
];
const Sider = () => {
  return (
    <Box sx={{ width: "250px", backgroundColor: "rgb(240,240,240)" }}>
      <List>
        {menu.map((i) => (
          <ListItemButton key={i.key}>{i.label}</ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default Sider;
