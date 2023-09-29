import client from "../../client";
import { IndexData } from "../../index-data";
import { UserType } from "../../models/user";

type UserIndexParams = {
  page?: number;
};

export default function userIndex({
  page = 1,
}: UserIndexParams): Promise<IndexData<UserType>> {
  return client
    .get("/api/user", {
      params: {
        page,
      },
    })
    .then((response) => response.data);
}
