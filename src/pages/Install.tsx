import { useForm, Controller } from "react-hook-form";
import { UserType } from "../api/models/user";
import AvatarField from "../components/form/AvatarField";
import TextField from "../components/form/TextField";
import { BasicSelectField } from "../components/form/select-field";
import { OptionType } from "../components/form/select-field/BasicSelectField";
import DateField from "../components/form/DateField";
import Button from "../components/form/Button";
import { toast } from "react-toastify";
import { useApi } from "../utilities/api";
import storeInitialUser from "../api/requests/setting/store-initial-user";
import { useState, useEffect } from "react";
import checkInstallation from "../api/requests/setting/check-installation";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function Install() {
  const [mount, setMount] = useState(false);
  const [, setCookies] = useCookies(["token"]);
  const navigate = useNavigate();

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      avatar: undefined,
      fullname: "",
      registered_number: "",
      password: "",
      gender: "male",
      birthday: "",
      department: "",
    } as Partial<UserType>,
  });

  const checkInstallationApi = useApi({
    api: checkInstallation,
    onSuccess: () => {
      setMount(true);
    },
    onFail: () => {
      navigate("/", {
        replace: true,
      });
    },
  });

  const storeInitialUserApi = useApi({
    api: storeInitialUser,
    onSuccess: (data) => {
      setCookies("token", data?.token, {
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
      });

      navigate("/", {
        replace: true,
      });
    },
  });

  const onSubmit = (data: Partial<UserType>) => {
    toast.promise(storeInitialUserApi.process(data), {
      pending: "Menyimpan...",
      error: "Terjadi kesalahan",
      success: "Berhasil disimpan",
    });
  };

  useEffect(() => {
    checkInstallationApi.process({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mount) return null;

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-200 p-5">
      <div className="w-full lg:w-[560px] bg-white rounded-r border border-gray-400 p-8 py-12">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="avatar"
            render={({ field: { value, onChange } }) => (
              <AvatarField
                value={value || null}
                className="mb-5"
                onChange={onChange}
              />
            )}
          />
          <TextField
            type="text"
            label="Nama Lengkap"
            containerClassName="mb-5"
            message={errors.fullname?.message}
            {...register("fullname", { required: "Wajib diisi" })}
          />
          <TextField
            type="text"
            label="NIP"
            containerClassName="mb-5"
            message={errors.registered_number?.message}
            {...register("registered_number", { required: "Wajib diisi" })}
          />
          <TextField
            type="password"
            label="Password"
            containerClassName="mb-5"
            message={errors.password?.message}
            {...register("password", {
              required: watch("id") ? false : "Wajib diisi",
            })}
          />
          <Controller
            control={control}
            name="gender"
            rules={{ required: "Wajib diisi" }}
            render={({ field: { value, onChange } }) => (
              <BasicSelectField
                value={value}
                onChange={(value) => onChange((value as OptionType).value)}
                message={errors.gender?.message}
                options={[
                  {
                    value: "male",
                    label: "Laki-laki",
                  },
                  {
                    value: "female",
                    label: "Perempuan",
                  },
                ]}
                label="Jenis Kelamin"
                containerClassName="mb-5"
              />
            )}
          />
          <DateField
            label="Tanggal Lahir"
            containerClassName="mb-5"
            message={errors.birthday?.message}
            {...register("birthday", { required: "Wajib diisi" })}
          />
          <TextField
            type="text"
            label="Divisi / Department"
            containerClassName="mb-5"
            message={errors.department?.message}
            {...register("department", { required: "Wajib diisi" })}
          />
          <Button
            type="submit"
            className="flex justify-center items-center space-x-2"
            disabled={storeInitialUserApi.isLoading}
          >
            Install
          </Button>
        </form>
      </div>
    </div>
  );
}
