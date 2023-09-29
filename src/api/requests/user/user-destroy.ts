import client from "../../client";
import { UserType } from "../../models/user";

export default function userDestroy(id: number): Promise<Partial<UserType>> {
  return client.delete("/api/user/" + id).then((response) => response.data);
}
