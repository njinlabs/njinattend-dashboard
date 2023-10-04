import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./router.tsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import store from "./utilities/redux/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <CookiesProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </CookiesProvider>
    <ToastContainer />
  </>
);
