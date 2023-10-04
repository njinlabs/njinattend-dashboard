import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import {
  RiAppsLine,
  RiCloseFill,
  RiLogoutBoxRLine,
  RiMenu3Fill,
} from "react-icons/ri";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import client from "../api/client";
import checkToken from "../api/requests/auth/check-token";
import signOut from "../api/requests/auth/sign-out";
import SidebarList from "../components/SidebarList";
import { confirmAlert } from "../components/sweet-alert";
import { useApi } from "../utilities/api";
import { useAppSelector } from "../utilities/redux/hooks";
import menus from "../utilities/sidebar-menus";

export default function Layout() {
  const [cookies, , removeCookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const interfaceData = useAppSelector((state) => state.interface);
  const [mount, setMount] = useState<boolean | AxiosError>(false);
  const [menuShown, setMenuShown] = useState(false);

  const signOutApi = useApi({
    api: signOut,
    onSuccess: () => {
      removeCookies("token", {
        path: "/",
      });
    },
  });

  const onLogout = () => {
    confirmAlert({ text: "Kamu yakin ingin keluar?" }).then((result) => {
      if (result.isConfirmed) {
        toast.promise(signOutApi.process({}), {
          pending: "Memproses...",
          success: "Berhasil keluar",
          error: "Terjadi kesalahan",
        });
      }
    });
  };

  const checkTokenApi = useApi({
    api: checkToken,
    onSuccess: () => {
      setMount(true);
    },
    onFail: (e) => {
      if ((e as AxiosError)?.response?.status === 401) {
        removeCookies("token", {
          path: "/",
        });
      } else {
        setMount(e as AxiosError);
      }
    },
  });

  useEffect(() => {
    if (cookies.token) {
      client.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${cookies.token}`;
      checkTokenApi.process({});
    } else {
      client.defaults.headers.common["Authorization"] = undefined;
      navigate("/auth/login", {
        replace: true,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies]);

  if (!mount) return null;
  if (mount instanceof AxiosError) return "Error";

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col">
      <div className="w-full z-10 h-16 bg-white border-b border-gray-300 flex items-center justify-start space-x-5 fixed top-0 left-0 lg:static">
        <div className="w-10 h-10 rounded ml-3 bg-primary-500 flex justify-center items-center border border-primary-600">
          <RiAppsLine className="text-xl" />
        </div>
        <div className="font-montserrat font-bold text-lg flex-1">
          {interfaceData.pageTitle}
        </div>
        <button
          className="block lg:hidden ml-auto py-4 px-5"
          type="button"
          onClick={() => setMenuShown((value) => !value)}
        >
          {menuShown ? <RiCloseFill /> : <RiMenu3Fill />}
        </button>
      </div>
      <div className="w-full flex-1 flex items-stretch overflow-hidden pt-16 lg:pt-0">
        <div
          className={`fixed top-16 left-0 z-10 lg:static w-full h-screen lg:h-auto lg:w-[240px] bg-gray-800 border-r-0 lg:border-r border-gray-900 px-3 transform ${
            menuShown ? "translate-x-0" : "translate-x-full"
          } lg:translate-x-0 transition duration-500`}
        >
          <div className="flex flex-col space-y-1 py-5">
            {menus.map((menu, index) => (
              <SidebarList
                path={menu.path}
                key={`${index}`}
                icon={menu.icon}
                active={interfaceData.activeBar === menu.name}
                onClick={() => setMenuShown(false)}
              >
                {menu.name}
              </SidebarList>
            ))}
            <SidebarList
              path="#"
              onClick={(e) => {
                e.preventDefault();
                onLogout();
              }}
              icon={RiLogoutBoxRLine}
            >
              Keluar
            </SidebarList>
          </div>
        </div>
        <div className="flex-1 p-5 flex flex-col">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
