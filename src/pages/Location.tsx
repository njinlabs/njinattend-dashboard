import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  RiAddBoxLine,
  RiDeleteBin2Line,
  RiPenNibLine,
  RiSave2Fill,
} from "react-icons/ri";
import { LocationType } from "../api/models/location";
import locationIndex from "../api/requests/location/location-index";
import ActionButton from "../components/ActionButton";
import Table from "../components/Table";
import Button from "../components/form/Button";
import LatlongPicker from "../components/form/LatlongPicker";
import Modal from "../components/modal";
import { useModal } from "../components/modal/use-modal";
import { useApi } from "../utilities/api";
import { useAppDispatch } from "../utilities/redux/hooks";
import { setInterface } from "../utilities/redux/slices/interface";
import TextField from "../components/form/TextField";
import locationStore from "../api/requests/location/location-store";
import { toast } from "react-toastify";
import { LatLngExpression } from "leaflet";
import locationUpdate from "../api/requests/location/location-update";
import locationDestroy from "../api/requests/location/location-destroy";
import { confirmAlert } from "../components/sweet-alert";

const resetData: Partial<LocationType> = {
  id: 0,
  name: "",
  address: "",
};

export default function Location() {
  const dispatch = useAppDispatch();
  const { control: composeModal } = useModal({});
  const [latlong, setLatlong] = useState<LatLngExpression | null>(null);

  const {
    control,
    reset,
    setValue,
    formState: { errors },
    register,
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: resetData,
  });

  const locationIndexApi = useApi({
    api: locationIndex,
  });

  const locationStoreApi = useApi({
    api: locationStore,
    onSuccess: () => {
      composeModal.close();
      locationIndexApi.process({ ...locationIndexApi.savedProps });
    },
  });

  const locationUpdateApi = useApi({
    api: locationUpdate,
    onSuccess: () => {
      composeModal.close();
      locationIndexApi.process({ ...locationIndexApi.savedProps });
    },
  });

  const locationDestroyApi = useApi({
    api: locationDestroy,
    onSuccess: () => {
      composeModal.close();
      locationIndexApi.process({ ...locationIndexApi.savedProps });
    },
  });

  const onSubmit = (data: Partial<LocationType>) => {
    toast.promise(
      (data.id ? locationUpdateApi : locationStoreApi).process(data),
      {
        pending: "Menyimpan...",
        error: "Terjadi kesalahan",
        success: "Berhasil disimpan",
      }
    );
  };

  const onDelete = (id: number) => {
    confirmAlert({
      text: "Anda akan menghapus lokasi ini",
    }).then((result) => {
      if (result.isConfirmed) {
        toast.promise(locationDestroyApi.process(id), {
          pending: "Menghapus...",
          error: "Terjadi kesalahan",
          success: "Berhasil dihapus",
        });
      }
    });
  };

  useEffect(() => {
    if (dispatch) {
      dispatch(
        setInterface({
          activeBar: "Lokasi",
          pageTitle: "Lokasi",
        })
      );
    }
  }, [dispatch]);

  useEffect(() => {
    locationIndexApi.process({});

    navigator.geolocation.getCurrentPosition(function (position) {
      setLatlong({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Table
        loading={locationIndexApi.isLoading}
        data={(locationIndexApi.data?.rows || []) as LocationType[]}
        columns={[
          "indexing",
          {
            key: "name",
            label: "Nama",
            props: {
              style: {
                whiteSpace: "nowrap",
              },
            },
          },
          {
            key: "address",
            label: "Alamat",
          },
          {
            key: "longitude",
            label: "Longitude",
          },
          {
            key: "latitude",
            label: "Latitude",
          },
          {
            key: null,
            label: "",
            action: true,
            render: (_, index) => (
              <>
                <ActionButton
                  color="yellow"
                  icon={RiPenNibLine}
                  type="button"
                  onClick={() => {
                    reset({
                      ...locationIndexApi.data!.rows[index],
                      latlong: {
                        lat: locationIndexApi.data!.rows[index].latitude,
                        lng: locationIndexApi.data!.rows[index].longitude,
                      },
                    });
                    composeModal.open();
                  }}
                >
                  Edit
                </ActionButton>
                <ActionButton
                  color="red"
                  icon={RiDeleteBin2Line}
                  onClick={() =>
                    onDelete(locationIndexApi.data!.rows[index].id!)
                  }
                >
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
              color="green"
              className="flex justify-center items-center space-x-2"
              onClick={() => {
                reset({ ...resetData, latlong: latlong! });
                composeModal.open();
              }}
            >
              <RiAddBoxLine /> <span>Tambah</span>
            </Button>
          </>
        }
        onSearch={(search) => console.log(search)}
        pageTotal={locationIndexApi.data?.page_count || 0}
        onPageChanged={(page) =>
          locationIndexApi
            .withoutReset()
            .process({ ...(locationIndexApi.savedProps || {}), page })
        }
      />
      <Modal
        control={composeModal}
        title={watch("id") ? "Edit Lokasi" : "Tambah Lokasi"}
        onClose={() => {
          reset(resetData);
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            type="string"
            label="Nama"
            message={errors.name?.message}
            {...register("name", { required: "Wajib diisi" })}
            containerClassName="mb-5"
          />
          <TextField
            type="string"
            label="Alamat"
            message={errors.address?.message}
            {...register("address", { required: "Wajib diisi" })}
            containerClassName="mb-5"
          />
          <Controller
            control={control}
            name="latlong"
            rules={{ required: "Wajib diisi" }}
            render={({ field: { value, onChange } }) => (
              <LatlongPicker
                value={value!}
                onChange={(val) => {
                  onChange(val);
                  setValue("latitude", val.lat);
                  setValue("longitude", val.lng);
                }}
                className="mb-5"
              />
            )}
          />

          <div className="flex justify-start items-center space-x-3 mb-5">
            <TextField
              type="string"
              readOnly
              label="Latitude"
              containerClassName="flex-1"
              message={errors.latitude?.message}
              {...register("latitude", { required: "Wajib diisi" })}
            />
            <TextField
              type="string"
              readOnly
              label="Longitude"
              containerClassName="flex-1"
              message={errors.longitude?.message}
              {...register("longitude", { required: "Wajib diisi" })}
            />
          </div>
          <Button
            type="submit"
            className="flex justify-center items-center space-x-2"
          >
            <RiSave2Fill />
            <span>Simpan</span>
          </Button>
        </form>
      </Modal>
    </>
  );
}
