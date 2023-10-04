import client from "../../client";
import { LocationType } from "../../models/location";

export default function locationDestroy(
  id: number
): Promise<Partial<LocationType>> {
  return client.delete(`/api/location/${id}`).then((response) => response.data);
}
