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
} from "react-icons/ri";
import Button from "../components/form/Button";

export default function User() {
  const dispatch = useAppDispatch();

  const userIndexApi = useApi({
    api: userIndex,
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
    <Table
      loading={userIndexApi.isLoading}
      data={(userIndexApi.data?.rows || []) as UserType[]}
      columns={[
        "indexing",
        {
          key: "registered_number",
          label: "NIP",
        },
        {
          key: "fullname",
          label: "Nama Lengkap",
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
  );
}
