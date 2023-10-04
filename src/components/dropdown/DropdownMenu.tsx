import {
  ReactNode,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

const dropdownMenuPosition = {
  BottomRight: "absolute top-full right-0",
  TopRight: "absolute bottom-full right-0",
  TopLeft: "absolute bottom-full left-0",
  Custom: "absolute",
};

const dropdownMenuAnimation = {
  FromTop: "-translate-y-full opacity-0",
  FromBottom: "translate-y-full opacity-0",
};

type DropdownMenuProps = {
  children?: ReactNode;
  position?: keyof typeof dropdownMenuPosition;
  animation?: keyof typeof dropdownMenuAnimation;
  className?: string;
};

export type DropdownMenuRefObject = {
  toggle: () => void;
  show: (args?: {
    top?: string;
    left?: string;
    bottom?: string;
    right?: string;
  }) => void;
  close: () => void;
  onBlur: React.FocusEventHandler<HTMLDivElement>;
};

const DropdownMenu = forwardRef(
  (
    {
      children,
      position = "BottomRight",
      animation = "FromTop",
      className = "",
    }: DropdownMenuProps,
    ref
  ) => {
    const [hide, setHide] = useState(true);
    const [animate, setAnimate] = useState(false);
    const [style, setStyle] = useState({});
    const [mount, setMount] = useState(false);

    const open = () => {
      setHide(false);
    };

    const close = () => {
      setAnimate(false);
    };

    useImperativeHandle(
      ref,
      (): DropdownMenuRefObject => ({
        toggle: () => {
          if (hide) {
            open();
          } else {
            close();
          }
        },
        show: (position = {}) => {
          setStyle(position);
        },
        close,
        onBlur: (event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            close();
          }
        },
      }),
      [hide]
    );

    useEffect(() => {
      if (!hide) {
        setAnimate(true);
      }
    }, [hide]);

    useEffect(() => {
      if (!animate) {
        const timeout = setTimeout(() => {
          setHide(true);
        }, 500);

        return () => {
          clearTimeout(timeout);
        };
      }
    }, [animate]);

    useEffect(() => {
      if (mount) {
        open();
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [style]);

    useEffect(() => {
      setMount(true);
    }, []);

    return (
      <div
        className={`${hide ? "hidden" : "block"} z-20 ${
          dropdownMenuPosition[position]
        } w-52 bg-white rounded border shadow border-gray-300 my-3 text-sm flex flex-col transform transition duration-500 ${
          animate
            ? "translate-y-0 opacity-100"
            : dropdownMenuAnimation[animation]
        } ${className}`}
        style={style}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    );
  }
);

export default DropdownMenu;
