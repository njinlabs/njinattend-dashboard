import { createSlice } from "@reduxjs/toolkit";

type InterfaceSliceData = {
  activeBar?: string;
  pageTitle?: string;
};

export const interfaceSlice = createSlice({
  name: "interface",
  initialState: {
    activeBar: "Dashboard",
    pageTitle: "Dashboard",
  } as InterfaceSliceData,
  reducers: {
    setInterface: (
      state,
      { payload }: { payload: Partial<InterfaceSliceData> }
    ) => {
      return { ...state, ...payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setInterface } = interfaceSlice.actions;

export default interfaceSlice.reducer;
