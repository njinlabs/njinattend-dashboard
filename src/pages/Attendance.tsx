import moment from "moment";
import { useEffect, useState, ChangeEvent } from "react";
import { AttendanceType } from "../api/models/attendance";
import { UserType } from "../api/models/user";
import attendanceDaily from "../api/requests/attendance/attendace-daily";
import Table from "../components/Table";
import { useApi } from "../utilities/api";
import { useAppDispatch } from "../utilities/redux/hooks";
import { setInterface } from "../utilities/redux/slices/interface";
import DateField from "../components/form/DateField";

export default function Attendance() {
  const dispatch = useAppDispatch();
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));

  const attendanceDailyApi = useApi({
    api: attendanceDaily,
  });

  useEffect(() => {
    if (dispatch) {
      dispatch(
        setInterface({
          activeBar: "Laporan",
          pageTitle: "Laporan",
        })
      );
    }
  }, [dispatch]);

  useEffect(() => {
    attendanceDailyApi
      .remember()
      .process({ ...attendanceDailyApi.savedProps, period: date });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  return (
    <Table
      loading={attendanceDailyApi.isLoading}
      data={(attendanceDailyApi.data?.rows || []) as UserType[]}
      columns={[
        "indexing",
        {
          key: "registered_number",
          label: "NIP",
          props: {
            style: {
              whiteSpace: "nowrap",
            },
          },
        },
        {
          key: "fullname",
          label: "Nama",
          props: {
            style: {
              whiteSpace: "nowrap",
            },
          },
        },
        {
          key: "attendance",
          label: "Masuk",
          props: {
            style: {
              whiteSpace: "nowrap",
            },
          },
          render: (value) =>
            (value as AttendanceType)?.in_record
              ? moment((value as AttendanceType).in_record).format("HH:mm")
              : "-",
        },
        {
          key: "attendance",
          label: "Keluar",
          props: {
            style: {
              whiteSpace: "nowrap",
            },
          },
          render: (value) =>
            (value as AttendanceType)?.out_record
              ? moment((value as AttendanceType).out_record).format("HH:mm")
              : "-",
        },
        {
          key: "attendance",
          label: "Lokasi Masuk",
          props: {
            style: {
              whiteSpace: "nowrap",
            },
          },
          render: (value) =>
            (value as AttendanceType)?.in_location?.name || "-",
        },
        {
          key: "attendance",
          label: "Lokasi Keluar",
          props: {
            style: {
              whiteSpace: "nowrap",
            },
          },
          render: (value) =>
            (value as AttendanceType)?.out_location?.name || "-",
        },
      ]}
      buttons={
        <>
          <DateField
            value={date}
            onChange={(e) =>
              setDate((e as ChangeEvent<HTMLInputElement>).target.value)
            }
          />
        </>
      }
      onSearch={(search) =>
        attendanceDailyApi
          .remember()
          .process({ ...attendanceDailyApi.savedProps, search })
      }
      pageTotal={attendanceDailyApi.data?.page_count || 0}
      onPageChanged={(page) =>
        attendanceDailyApi
          .withoutReset()
          .process({ ...(attendanceDailyApi.savedProps || {}), page })
      }
    />
  );
}
