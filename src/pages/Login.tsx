import { CgUser, CgLock } from "react-icons/cg";
import TextField from "../components/form/TextField";
import Button from "../components/form/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { UserType } from "../api/models/user";
import { useApi } from "../utilities/api";
import signIn from "../api/requests/auth/sign-in";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const [cookies, setCookies] = useCookies(["token"]);
  const navigate = useNavigate();

  const signInApi = useApi({
    api: signIn,
    onSuccess: (data) => {
      setCookies("token", data?.token, {
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
      });
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {} as Partial<UserType>,
  });

  const onLogin: SubmitHandler<Partial<UserType>> = ({
    registered_number,
    password,
  }) =>
    toast.promise(
      signInApi.process({
        registered_number,
        password,
      }),
      {
        pending: "Tunggu sebentar...",
        error: "Autentikasi gagal",
        success: "Berhasil masuk",
      }
    );

  useEffect(() => {
    if (cookies.token && navigate) {
      navigate("/", {
        replace: true,
      });
    }
  }, [cookies, navigate]);

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-200 p-5">
      <div className="w-full lg:w-[860px] rounded flex justify-start items-stretch">
        <div className="w-1/2 bg-gray-800 rounded-l flex-shrink-0 border border-gray-900 hidden lg:block"></div>
        <div className="flex-1 bg-white rounded-r border lg:border-l-0 border-gray-400 p-8 py-12">
          <div className="font-bold text-2xl font-montserrat text-gray-800">
            Login
          </div>
          <div>Silahkan masuk menggunakan akun anda</div>
          <form className="mt-10" onSubmit={handleSubmit(onLogin)}>
            <TextField
              type="text"
              placeholder="NIP"
              containerClassName="mb-5"
              prefix={(<CgUser className="text-lg" />) as JSX.Element & string}
              message={errors.registered_number?.message}
              {...register("registered_number", { required: true })}
            />
            <TextField
              type="password"
              placeholder="Password"
              containerClassName="mb-5"
              prefix={(<CgLock className="text-lg" />) as JSX.Element & string}
              message={errors.password?.message}
              {...register("password", { required: true })}
            />
            <Button
              type="submit"
              element={"button"}
              className="w-full"
              disabled={signInApi.isLoading}
            >
              Masuk
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
