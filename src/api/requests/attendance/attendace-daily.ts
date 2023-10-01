import client from "../../client";
import { IndexData } from "../../index-data";
import { UserType } from "../../models/user";

type AttendanceDailyParams = {
  page?: number;
  period?: string;
};

export default function attendanceDaily({
  page = 1,
  period,
}: AttendanceDailyParams): Promise<IndexData<UserType>> {
  return client
    .get("/api/attendance/daily", {
      params: {
        page,
        period,
      },
    })
    .then((response) => response.data);
}
