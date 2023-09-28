import { RiAppsLine } from "react-icons/ri";
import menus from "../utilities/SidebarMenus";
import SidebarList from "../components/SidebarList";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../utilities/redux/hooks";

export default function Layout() {
  const interfaceData = useAppSelector((state) => state.interface);

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
                key={`${index}`}
                icon={menu.icon}
                active={interfaceData.activeBar === menu.name}
              >
                {menu.name}
              </SidebarList>
            ))}
          </div>
        </div>
        <div className="flex-1 p-5 flex flex-col">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
