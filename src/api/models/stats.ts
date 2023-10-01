import { ChartType } from "./chart";

export type StatsType = {
  charts: ChartType[];
  in_records: number;
  out_records: number;
  users: number;
  locations: number;
};
