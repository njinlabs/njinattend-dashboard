import client from "../../client";
import { LocationType } from "../../models/location";

export default function locationUpdate({
  id,
  name,
  address,
  latitude,
  longitude,
}: Partial<LocationType>): Promise<Partial<LocationType>> {
  return client
    .put(`/api/location/${id}`, {
      name,
      address,
      latitude,
      longitude,
    })
    .then((response) => response.data);
}
