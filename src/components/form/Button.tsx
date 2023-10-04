import { ComponentProps, ReactNode } from "react";
import { Link } from "react-router-dom";
import coloring from "../variables/coloring";

export type ButtonProps<T extends "link" | "button" = "button"> = {
  element?: T;
  children?: ReactNode;
  color?: keyof typeof coloring;
};

export default function Button<T extends "link" | "button">({
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
        className={`${coloring[color]} font-montserrat uppercase rounded py-3 px-5 text-sm ${className}`}
      >
        {children}
      </button>
    );
  }

  return (
    <Link
      {...(props as unknown as ComponentProps<typeof Link>)}
      className={`${coloring[color]} font-montserrat uppercase rounded py-3 px-5 text-sm ${className}`}
    >
      {children}
    </Link>
  );
}
