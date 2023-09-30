import client from "../../client";
import { IndexData } from "../../index-data";
import { LocationType } from "../../models/location";

type LocationIndexParams = {
  page?: number;
};

export default function locationIndex({
  page = 1,
}: LocationIndexParams): Promise<IndexData<LocationType>> {
  return client
    .get("/api/location", {
      params: {
        page,
      },
    })
    .then((response) => response.data);
}
