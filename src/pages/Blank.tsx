import { useEffect } from "react";
import { useAppDispatch } from "../utilities/redux/hooks";
import { setInterface } from "../utilities/redux/slices/interface";

export default function Blank() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (dispatch) {
      dispatch(
        setInterface({
          activeBar: "Dashboard",
          pageTitle: "Dashboard",
        })
      );
    }
  }, [dispatch]);

  return null;
}
