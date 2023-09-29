import client from "../../client";
import { UserType } from "../../models/user";

export default function checkToken(): Promise<Partial<UserType>> {
  return client.get("/api/auth/check-token").then((response) => response.data);
}
