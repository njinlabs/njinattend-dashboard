import { IconType } from "react-icons";
import {
  RiDashboard2Line,
  RiFingerprint2Line,
  RiGroupLine,
  RiMapPin2Line,
} from "react-icons/ri";

type SidebarMenuItem = {
  name: string;
  icon: IconType;
};

const menus: SidebarMenuItem[] = [
  {
    name: "Dashboard",
    icon: RiDashboard2Line,
  },
  {
    name: "Pengguna",
    icon: RiGroupLine,
  },
  {
    name: "Lokasi",
    icon: RiMapPin2Line,
  },
  {
    name: "Absensi",
    icon: RiFingerprint2Line,
  },
];

export default menus;
