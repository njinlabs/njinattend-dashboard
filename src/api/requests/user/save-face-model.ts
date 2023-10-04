import client from "../../client";

type SaveFaceModelParams = {
  id: number;
  face: File;
};

export default function saveFaceModel({
  id,
  face,
}: SaveFaceModelParams): Promise<unknown> {
  const formData = new FormData();
  formData.append("face", face);
  return client
    .put(`/api/user/${id}/face`, formData)
    .then((response) => response.data);
}
