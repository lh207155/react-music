import { createBrowserRouter } from "react-router-dom";
import Content from "../components/content/Content";
import SongList from "../components/songList/SongList";
import App from "../App";
import SearchList from "../components/searchList/SearchList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Content />,
      },
      {
        path: "/songlistDetail/:id",
        element: <SongList />,
      },
      {
        path: "/search/:keywords",
        element: <SearchList />,
      },
    ],
  },
]);

export default router;
