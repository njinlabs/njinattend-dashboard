import { ComponentProps, ReactNode } from "react";
import { IconType } from "react-icons";
import { Link } from "react-router-dom";

export type ButtonProps<T extends "link" | "button" = "button"> = {
  element: T;
  children?: ReactNode;
  iconClassName?: string;
  icon?: IconType;
};

export default function DropdownItem<T extends "link" | "button">({
  element = "button" as T,
  children,
  className,
  icon: Icon,
  iconClassName,
  ...props
}: ButtonProps<T> & ComponentProps<T>) {
  if (element === "button")
    return (
      <button
        {...(props as unknown as ComponentProps<"button">)}
        className={`rounded flex items-center py-4 justify-start text-left bg-white hover:bg-gray-100 text-gray-600 text-sm ${className}`}
      >
        {Icon && (
          <div
            className={`w-12 flex items-center justify-center text-gray-800`}
          >
            <Icon className={`text-lg mb-0.5 ${iconClassName}`} />
          </div>
        )}
        <div className={Icon ? "pr-5" : "px-5"}>{children}</div>
      </button>
    );

  return (
    <Link
      {...(props as unknown as ComponentProps<typeof Link>)}
      className={`rounded flex items-center py-4 justify-start text-left bg-white hover:bg-gray-100 text-gray-600 text-sm ${className}`}
    >
      {Icon && (
        <div className={`w-12 flex items-center justify-center text-gray-800`}>
          <Icon className={`text-lg mb-0.5 ${iconClassName}`} />
        </div>
      )}
      <div className={Icon ? "pr-5" : "px-5"}>{children}</div>
    </Link>
  );
}
