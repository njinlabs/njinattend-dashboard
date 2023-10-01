import client from "../../client";

export default function checkInstallation() {
  return client
    .get("/api/setting/check-installation")
    .then((response) => response.data);
}
