import { IconType } from "react-icons";

export default function StatsCard({
  value,
  label,
  icon: Icon,
  colorClass,
}: {
  value: number;
  label: string;
  icon: IconType;
  colorClass: string;
}) {
  return (
    <div className="p-5 border border-gray-300 rounded flex justify-start items-center bg-white">
      <div className="flex-1">
        <div className="font-bold font-montserrat text-2xl">{value}</div>
        <div className="font-nunito-sans text-sm">{label}</div>
      </div>
      <div
        className={
          "w-12 h-12 flex-shrink-0 rounded flex justify-center items-center text-3xl " +
          colorClass
        }
      >
        <Icon />
      </div>
    </div>
  );
}
