import client from "../../client";
import { LocationType } from "../../models/location";

export default function locationStore({
  name,
  address,
  longitude,
  latitude,
}: Partial<LocationType>): Promise<Partial<LocationType>> {
  return client
    .post("/api/location", {
      name,
      address,
      latitude,
      longitude,
    })
    .then((response) => response.data);
}
