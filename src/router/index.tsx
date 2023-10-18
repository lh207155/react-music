import { createBrowserRouter } from "react-router-dom";
import Content from "../components/content/Content";
import SongList from "../components/songList/SongList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Content />,
  },
  {
    path: "/songlistDetail/:id",
    element: <SongList />,
  },
]);

export default router;
