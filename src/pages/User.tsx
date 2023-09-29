import { useEffect } from "react";
import { useAppDispatch } from "../utilities/redux/hooks";
import { setInterface } from "../utilities/redux/slices/interface";
import { useApi } from "../utilities/api";
import userIndex from "../api/requests/user/user-index";
import Table from "../components/Table";
import { UserType } from "../api/models/user";
import moment from "moment";
import ActionButton from "../components/ActionButton";
import {
  RiPenNibLine,
  RiDeleteBin2Line,
  RiAddBoxLine,
  RiCamera2Line,
  RiUser6Fill,
  RiSave2Fill,
} from "react-icons/ri";
import Button from "../components/form/Button";
import { FileType } from "../api/models/file";
import generateUrl from "../utilities/generate-url";
import Modal from "../components/modal";
import { useModal } from "../components/modal/use-modal";
import AvatarField from "../components/form/AvatarField";
import TextField from "../components/form/TextField";
import { BasicSelectField } from "../components/form/select-field";
import DateField from "../components/form/DateField";
import { useForm, Controller } from "react-hook-form";
import { OptionType } from "../components/form/select-field/BasicSelectField";
import userStore from "../api/requests/user/user-store";
import { toast } from "react-toastify";

const resetData: Partial<UserType> = {
  id: 0,
  avatar: undefined,
  fullname: "",
  registered_number: "",
  password: "",
  gender: "male",
  birthday: "",
  department: "",
  role: "",
};

export default function User() {
  const dispatch = useAppDispatch();
  const { control: composeModal } = useModal({});

  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    defaultValues: resetData,
  });

  const onSubmit = (data: Partial<UserType>) => {
    toast.promise(userStoreApi.process(data), {
      pending: "Menyimpan...",
      error: "Terjadi kesalahan",
      success: "Berhasil disimpan",
    });
  };

  const userIndexApi = useApi({
    api: userIndex,
  });

  const userStoreApi = useApi({
    api: userStore,
    onSuccess: () => {
      composeModal.close();
      userIndexApi.process({ ...userIndexApi.savedProps });
    },
  });

  useEffect(() => {
    if (dispatch) {
      dispatch(
        setInterface({
          activeBar: "Pengguna",
          pageTitle: "Pengguna",
        })
      );
    }
  }, [dispatch]);

  useEffect(() => {
    userIndexApi.process({});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Table
        loading={userIndexApi.isLoading}
        data={(userIndexApi.data?.rows || []) as UserType[]}
        columns={[
          "indexing",
          {
            key: "avatar",
            label: "Foto",
            render: (value) => (
              <div className="w-8 h-8 rounded-full bg-primary-100 relative overflow-hidden flex justify-center items-center">
                {value ? (
                  <img
                    src={generateUrl((value as FileType)?.url as string)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <RiUser6Fill className="text-xl text-primary-500" />
                )}
              </div>
            ),
          },
          {
            key: "registered_number",
            label: "NIP",
          },
          {
            key: "fullname",
            label: "Nama Lengkap",
            props: {
              style: {
                whiteSpace: "nowrap",
              },
            },
          },
          {
            key: "gender",
            label: "Jenis Kelamin",
            render: (value) => (value === "male" ? "Laki-laki" : "Perempuan"),
          },
          {
            key: "face",
            label: "Face Recognition",
            render: (value) => (
              <ActionButton
                color={value ? "blue-outline" : "green-outline"}
                icon={RiCamera2Line}
              >
                {value ? "Ganti" : "Daftarkan"}
              </ActionButton>
            ),
          },
          {
            key: "birthday",
            label: "Tanggal Lahir",
            render: (value) => moment(value as string).format("DD/MM/YYYY"),
          },
          {
            key: "department",
            label: "Divisi / Department",
          },
          {
            key: null,
            label: "",
            action: true,
            render: () => (
              <>
                <ActionButton color="yellow" icon={RiPenNibLine}>
                  Edit
                </ActionButton>
                <ActionButton color="red" icon={RiDeleteBin2Line}>
                  Hapus
                </ActionButton>
              </>
            ),
          },
        ]}
        buttons={
          <>
            <Button
              type="button"
              onClick={() => {
                reset(resetData);
                composeModal.open();
              }}
              color="green"
              className="flex justify-center items-center space-x-2"
            >
              <RiAddBoxLine /> <span>Tambah</span>
            </Button>
          </>
        }
        onSearch={(search) => console.log(search)}
        pageTotal={userIndexApi.data?.page_count || 0}
        onPageChanged={(page) =>
          userIndexApi
            .withoutReset()
            .process({ ...(userIndexApi.savedProps || {}), page })
        }
      />
      <Modal control={composeModal} title="Tambah Pengguna">
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
            {...register("password", { required: "Wajib diisi" })}
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
          <Controller
            control={control}
            name="role"
            rules={{ required: "Wajib diisi" }}
            render={({ field: { value, onChange } }) => (
              <BasicSelectField
                value={value}
                onChange={(value) => onChange((value as OptionType).value)}
                message={errors.role?.message}
                options={[
                  {
                    value: "administrator",
                    label: "Administrator",
                  },
                  {
                    value: "user",
                    label: "Pengguna",
                  },
                ]}
                label="Hak Akses"
                containerClassName="mb-5"
              />
            )}
          />
          <Button
            type="submit"
            className="flex justify-center items-center space-x-2"
            disabled={userStoreApi.isLoading}
          >
            <RiSave2Fill />
            <span>Simpan</span>
          </Button>
        </form>
      </Modal>
    </>
  );
}
