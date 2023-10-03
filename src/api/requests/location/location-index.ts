import client from "../../client";
import { IndexData } from "../../index-data";
import { LocationType } from "../../models/location";

type LocationIndexParams = {
  page?: number;
  search?: string;
};

export default function locationIndex({
  page = 1,
  search,
}: LocationIndexParams): Promise<IndexData<LocationType>> {
  return client
    .get("/api/location", {
      params: {
        page,
        search,
      },
    })
    .then((response) => response.data);
}
