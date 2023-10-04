import moment from "moment";
import { useEffect, useMemo } from "react";
import { AxisOptions, Chart } from "react-charts";
import stats from "../api/requests/stats/stats";
import { useApi } from "../utilities/api";
import { useAppDispatch } from "../utilities/redux/hooks";
import { setInterface } from "../utilities/redux/slices/interface";
import { ChartType } from "../api/models/chart";
import StatsCard from "../components/StatsCard";
import {
  HiUser,
  HiArrowDownOnSquareStack,
  HiArrowUpOnSquareStack,
  HiMapPin,
} from "react-icons/hi2";

export default function Blank() {
  const dispatch = useAppDispatch();

  const statsApi = useApi({
    api: stats,
  });

  const primaryAx = useMemo(
    (): AxisOptions<ChartType> => ({
      getValue: (datum) => datum.period,
    }),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [statsApi.data]
  );

  const secondaryAx = useMemo(
    (): AxisOptions<ChartType>[] => [
      {
        getValue: (datum) => datum.value,
      },
    ],

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [statsApi.data]
  );

  useEffect(() => {
    if (dispatch) {
      dispatch(
        setInterface({
          activeBar: "Dashboard",
          pageTitle: "Dashboard",
        })
      );
    }
  }, [dispatch]);

  useEffect(() => {
    statsApi.process({});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!statsApi.data) return null;

  return (
    <>
      <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-4 gap-5 mb-5">
        <StatsCard
          icon={HiArrowDownOnSquareStack}
          value={statsApi.data?.in_records}
          label="Absen Masuk"
          colorClass="bg-green-100 border border-green-200 text-green-600"
        />
        <StatsCard
          icon={HiArrowUpOnSquareStack}
          value={statsApi.data?.out_records}
          label="Absen Keluar"
          colorClass="bg-red-100 border border-red-200 text-red-600"
        />
        <StatsCard
          icon={HiUser}
          value={statsApi.data?.users}
          label="Pengguna"
          colorClass="bg-blue-100 border border-blue-200 text-blue-600"
        />
        <StatsCard
          icon={HiMapPin}
          value={statsApi.data?.locations}
          label="Lokasi"
          colorClass="bg-yellow-100 border border-yellow-200 text-yellow-600"
        />
      </div>
      <div className="flex-1 bg-white rounded p-5 border border-gray-300">
        <div className="w-full h-full">
          <Chart
            options={{
              data: [
                {
                  label: "Statistik Absensi",
                  data: (statsApi.data?.charts || []).map(
                    (data: ChartType) => ({
                      period: moment(data.period).toDate(),
                      value: data.value,
                    })
                  ),
                },
              ],
              primaryAxis: primaryAx,
              secondaryAxes: secondaryAx,
            }}
          />
        </div>
      </div>
    </>
  );
}
