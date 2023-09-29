import client from "../../client";
import { UserType } from "../../models/user";

export default function userStore({
  avatar,
  ...data
}: Partial<UserType>): Promise<Partial<UserType>> {
  const formData = new FormData();
  for (const field in data) {
    if (
      data[field as keyof typeof data] &&
      typeof data[field as keyof typeof data] === "string"
    ) {
      formData.append(field, data[field as keyof typeof data] as string);
    }
  }

  if (avatar instanceof File) {
    formData.append("avatar", avatar);
  }

  return client.post("/api/user", formData).then((response) => response.data);
}
