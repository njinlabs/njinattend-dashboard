import { ComponentProps, ReactNode } from "react";
import Select, {
  ControlProps,
  MenuProps,
  OptionProps,
  OptionsOrGroups,
  components,
} from "react-select";

export type OptionType = {
  value: string | number | null;
  label: string;
};

type BasicSelectFieldProps = {
  label?: string;
  containerClassName?: string;
  icon?: ReactNode;
  className?: string;
  options?: OptionsOrGroups<OptionType, never>;
  value?: string | string[];
  message?: string;
};

export default function BasicSelectField({
  label,
  containerClassName = "",
  options = [],
  value = "",
  message = "",
  ...props
}: BasicSelectFieldProps & ComponentProps<Select>) {
  const Control = ({ children, ...rest }: ControlProps) => (
    <components.Control
      {...rest}
      getStyles={() => ({})}
      className={`flex w-full h-12 border ${
        message ? "border-red-600" : "border-gray-300"
      } rounded relative shadow-none!`}
    >
      {children}
    </components.Control>
  );

  const Option = ({ children, ...rest }: OptionProps) => (
    <components.Option
      {...rest}
      getStyles={() => ({})}
      className="p-3 h rounded hover:bg-primary-100 cursor-pointer"
    >
      {children}
    </components.Option>
  );

  const Menu = ({ children, ...rest }: MenuProps) => (
    <components.Menu
      {...rest}
      getStyles={() => ({})}
      className="p-1 bg-white rounded border absolute z-10 w-full mt-1"
    >
      {children}
    </components.Menu>
  );

  return (
    <div className={containerClassName}>
      {label && <label>{label}</label>}
      <Select
        classNamePrefix={message ? "selectfield-error" : "selectfield"}
        value={
          props.isMulti && Array.isArray(value)
            ? (value || []).filter((el) =>
                options.find((option) => option.value === el)
              )
            : options.find((option) => option.value === value) || {}
        }
        options={options}
        components={{ Control, Option, Menu }}
        {...props}
      />
      {message && <div className="text-sm text-red-700">{message}</div>}
    </div>
  );
}
