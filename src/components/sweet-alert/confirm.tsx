import mySwal from "./my-swal";
import { ReactSweetAlertOptions } from "sweetalert2-react-content";
import { CgDanger } from "react-icons/cg";

export const confirmAlert = ({ ...options }: ReactSweetAlertOptions) => {
  return mySwal.fire({
    ...options,
    icon: "warning",
    title: "Yakin?",
    showCancelButton: true,
    cancelButtonText: "Batal",
    confirmButtonText: "Ya, Lanjutkan",
    customClass: "alert",
    iconHtml: <CgDanger />,
  });
};
