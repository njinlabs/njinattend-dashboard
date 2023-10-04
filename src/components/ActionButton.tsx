import { ComponentProps } from "react";
import { Link } from "react-router-dom";
import { ButtonProps } from "./form/Button";
import coloring from "./variables/coloring";
import { IconType } from "react-icons";

type ActionButtonProps = {
  icon: IconType;
};

export default function ActionButton<T extends "link" | "button">({
  element = "button" as T,
  children,
  color = "primary",
  className,
  icon: Icon,
  ...props
}: ButtonProps<T> & ComponentProps<T> & ActionButtonProps) {
  if (element === "button") {
    return (
      <button
        {...(props as unknown as ComponentProps<"button">)}
        className={`${coloring[color]} rounded flex justify-start items-center ${className}`}
      >
        <span className="w-8 h-8 flex justify-center items-center">
          <Icon className="text-lg" />
        </span>
        <span className="pr-3 hidden lg:block">{children}</span>
      </button>
    );
  }

  return (
    <Link
      {...(props as unknown as ComponentProps<typeof Link>)}
      className={`${coloring[color]} font-montserrat font-bold uppercase rounded px-3 py-2 text-sm ${className}`}
    >
      <span className="w-8 h-8 flex justify-center items-center">
        <Icon className="text-lg" />
      </span>
      <span className="pr-3 hidden lg:block">{children}</span>
    </Link>
  );
}
