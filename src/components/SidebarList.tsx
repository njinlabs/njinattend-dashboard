import { ReactNode } from "react";
import { IconType } from "react-icons";
import { Link } from "react-router-dom";

type SidebarListProps = {
  icon: IconType;
  children: ReactNode;
  active?: boolean;
  path: string;
};

export default function SidebarList({
  icon: Icon,
  children,
  active,
  path,
}: SidebarListProps) {
  return (
    <Link
      to={path}
      className={`py-4 flex justify-start items-center text-white rounded relative ${
        active ? "bg-gray-900" : "hover:bg-gray-900"
      }`}
    >
      <div className="w-10 flex justify-center">
        <Icon className="text-xl mb-0.5" />
      </div>
      <span className="font-nunito-sans ml-2 text-gray-200">{children}</span>
      {active && (
        <div className="h-full w-1 absolute -left-3 top-0 bg-primary-500 rounded-r" />
      )}
    </Link>
  );
}
