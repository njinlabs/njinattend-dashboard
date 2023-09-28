import { ComponentProps, ReactNode } from "react";
import { Link } from "react-router-dom";

const colorType = {
  primary:
    "bg-primary-400 hover:bg-primary-500 text-gray-800 border border-primary-600",
  yellow:
    "bg-yellow-500 hover:bg-yellow-600 text-white border border-yellow-700",
  red: "bg-red-500 hover:bg-red-600 text-white border border-red-700",
  green: "bg-green-600 hover:bg-green-700 text-white border border-green-800",
  basic: "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300",
  "green-outline":
    "bg-green-100 hover:bg-green-200 text-green-800 border border-green-300",
  "blue-outline":
    "bg-blue-100 hover:bg-blue-200 text-blue-800 border border-blue-300",
  dark: "bg-gray-600 hover:bg-gray-700 text-white border border-gray-800",
};

export type ButtonProps<T extends typeof Link | "button" = "button"> = {
  element?: T;
  children?: ReactNode;
  color?: keyof typeof colorType;
};

export default function Button<T extends typeof Link | "button">({
  element = "button" as T,
  children,
  color = "primary",
  className,
  ...props
}: ButtonProps<T> & ComponentProps<T>) {
  if (element === "button") {
    return (
      <button
        {...(props as unknown as ComponentProps<"button">)}
        className={`${colorType[color]} font-montserrat font-bold uppercase rounded h-12 px-8 text-sm ${className}`}
      >
        {children}
      </button>
    );
  }

  return (
    <Link
      to={(props as unknown as ComponentProps<typeof Link>).to}
      className={`${colorType[color]} font-montserrat font-bold uppercase rounded h-12 px-8 text-sm ${className}`}
    >
      {children}
    </Link>
  );
}
