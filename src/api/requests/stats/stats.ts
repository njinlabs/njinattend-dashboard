import client from "../../client";
import { StatsType } from "../../models/stats";

export default function stats(): Promise<StatsType> {
  return client.get("/api/stats").then((response) => response.data);
}
