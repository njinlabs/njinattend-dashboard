import client from "../../client";
import { IndexData } from "../../index-data";
import { UserType } from "../../models/user";

type AttendanceDailyParams = {
  page?: number;
  period?: string;
  search?: string;
};

export default function attendanceDaily({
  page = 1,
  period,
  search,
}: AttendanceDailyParams): Promise<IndexData<UserType>> {
  return client
    .get("/api/attendance/daily", {
      params: {
        page,
        period,
        search,
      },
    })
    .then((response) => response.data);
}
