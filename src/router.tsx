import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Blank from "./pages/Blank";
import Layout from "./pages/Layout";

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
    ],
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
]);

export default router;
