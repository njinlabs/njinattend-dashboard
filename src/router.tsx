import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/auth/login",
    element: <Login />,
  },
]);

export default router;
