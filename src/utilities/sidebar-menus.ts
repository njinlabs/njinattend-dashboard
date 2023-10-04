import { IconType } from "react-icons";
import {
  RiDashboard2Line,
  RiTableLine,
  RiGroupLine,
  RiMapPin2Line,
} from "react-icons/ri";

type SidebarMenuItem = {
  name: string;
  icon: IconType;
  path: string;
};

const menus: SidebarMenuItem[] = [
  {
    name: "Dashboard",
    icon: RiDashboard2Line,
    path: "/",
  },
  {
    name: "Pengguna",
    icon: RiGroupLine,
    path: "/users",
  },
  {
    name: "Lokasi",
    icon: RiMapPin2Line,
    path: "/location",
  },
  {
    name: "Laporan",
    icon: RiTableLine,
    path: "/attendance",
  },
];

export default menus;
