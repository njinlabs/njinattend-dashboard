import { CgUser, CgLock } from "react-icons/cg";
import TextField from "../components/form/TextField";
import Button from "../components/form/Button";

export default function Login() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-200">
      <div className="w-full lg:w-[860px] rounded flex justify-start items-stretch">
        <div className="w-1/2 bg-gray-800 rounded-l flex-shrink-0 border border-gray-900"></div>
        <div className="flex-1 bg-white rounded-r border border-l-0 border-gray-400 p-8 py-12">
          <div className="font-bold text-2xl font-montserrat text-gray-800">
            Login
          </div>
          <div>Silahkan masuk menggunakan akun anda</div>
          <form className="mt-10">
            <TextField
              type="text"
              placeholder="Username"
              containerClassName="mb-5"
              prefix={(<CgUser className="text-lg" />) as JSX.Element & string}
            />
            <TextField
              type="password"
              placeholder="Password"
              containerClassName="mb-5"
              prefix={(<CgLock className="text-lg" />) as JSX.Element & string}
            />
            <Button type="submit" element={"button"} className="w-full">
              Masuk
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
