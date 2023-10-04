import client from "../../client";
import { IndexData } from "../../index-data";
import { UserType } from "../../models/user";

type UserIndexParams = {
  page?: number;
  search?: string;
};

export default function userIndex({
  page = 1,
  search,
}: UserIndexParams): Promise<IndexData<UserType>> {
  return client
    .get("/api/user", {
      params: {
        page,
        search,
      },
    })
    .then((response) => response.data);
}
