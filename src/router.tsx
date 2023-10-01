import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Blank from "./pages/Blank";
import Layout from "./pages/Layout";
import User from "./pages/User";
import Location from "./pages/Location";
import Attendance from "./pages/Attendance";
import Install from "./pages/Install";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Blank />,
        index: true,
      },
      {
        path: "/users",
        element: <User />,
      },
      {
        path: "/location",
        element: <Location />,
      },
      {
        path: "/attendance",
        element: <Attendance />,
      },
    ],
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/install",
    element: <Install />,
  },
]);

export default router;
