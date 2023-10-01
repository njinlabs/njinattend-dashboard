import { RiAppsLine, RiLogoutBoxRLine } from "react-icons/ri";
import menus from "../utilities/sidebar-menus";
import SidebarList from "../components/SidebarList";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../utilities/redux/hooks";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import client from "../api/client";
import { useApi } from "../utilities/api";
import checkToken from "../api/requests/auth/check-token";
import { AxiosError } from "axios";
import signOut from "../api/requests/auth/sign-out";
import { confirmAlert } from "../components/sweet-alert";
import { toast } from "react-toastify";

export default function Layout() {
  const [cookies, , removeCookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const interfaceData = useAppSelector((state) => state.interface);
  const [mount, setMount] = useState<boolean | AxiosError>(false);

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
      <div className="w-full h-16 bg-white border-b border-gray-300 flex items-center justify-start space-x-5">
        <div className="w-10 h-10 rounded ml-3 bg-primary-500 flex justify-center items-center border border-primary-600">
          <RiAppsLine className="text-xl" />
        </div>
        <div className="font-montserrat font-bold text-lg">
          {interfaceData.pageTitle}
        </div>
      </div>
      <div className="w-full flex-1 flex items-stretch">
        <div className="w-[240px] bg-gray-800 border-r border-gray-900 px-3">
          <div className="flex flex-col space-y-1 py-5">
            {menus.map((menu, index) => (
              <SidebarList
                path={menu.path}
                key={`${index}`}
                icon={menu.icon}
                active={interfaceData.activeBar === menu.name}
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
