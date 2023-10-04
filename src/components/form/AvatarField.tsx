import { LegacyRef, useRef } from "react";
import { FileType } from "../../api/models/file";
import generateUrl from "../../utilities/generate-url";
import { RiUser6Fill, RiCameraFill } from "react-icons/ri";

export type AvatarFieldProps = {
  value: FileType | File | null;
  onChange?: (file: File) => void;
  className?: string;
};

export default function AvatarField({
  value,
  onChange,
  className = "",
}: AvatarFieldProps) {
  const inputFile = useRef<HTMLInputElement>();

  return (
    <div className={"flex justify-center " + className}>
      <div className="relative">
        <div className="w-28 h-28 lg:w-32 lg:h-32 flex-shrink-0 rounded-full bg-white relative overflow-hidden flex justify-center items-center border border-gray-300">
          {value ? (
            <img
              src={
                value instanceof File
                  ? URL.createObjectURL(value)
                  : generateUrl(value.url!)
              }
              className="w-full h-full object-cover"
            />
          ) : (
            <RiUser6Fill className="text-2xl lg:text-4xl text-gray-800" />
          )}
        </div>
        <input
          type="file"
          className="hidden"
          onChange={
            onChange
              ? (e) => e.target.files?.length && onChange(e.target.files[0])
              : () => {}
          }
          accept="image/*"
          ref={inputFile as LegacyRef<HTMLInputElement> | undefined}
        />
        <button
          type="button"
          className="w-10 h-10 rounded-full bg-gray-100 border border-gray-300 absolute bottom-0 right-0 text-gray-800 flex justify-center items-center hover:bg-gray-200"
          onClick={() => inputFile.current?.click()}
        >
          <RiCameraFill />
        </button>
      </div>
    </div>
  );
}
