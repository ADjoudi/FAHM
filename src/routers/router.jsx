import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import Landing from "../pages/Landing";
import SignUp from "../pages/Sing-up";
import Login from "../pages/Login";
import Post from "../pages/Post";
import Profile from "../pages/Profile";
import Archive from "../components/Archive";
import Bookmarks from "../components/Bookmarks";
import Comments from "../components/Comments";
import AddPost from "../pages/AddPost";
import EditPost from "../components/EditPost";
import Preview from "../components/Preview";

const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "login", element: <Login /> },
  { path: "sign-up", element: <SignUp /> },
  { path: "post/:post_id", element: <Post /> },
  {
    path: ":user_id/add-post",
    element: <AddPost />,
    children: [
      { index: true, element: <Navigate to="edit" /> },
      { path: "edit", element: <EditPost /> },
      { path: "preview", element: <Preview /> },
    ],
  },
  {
    path: "profile",
    element: <Profile />,
    children: [
      { index: true, element: <Navigate to="posts" /> },
      { path: "posts", element: <Archive /> },
      { path: "bookmarks", element: <Bookmarks /> },
      { path: "comments", element: <Comments /> },
    ],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}
export default Router;
