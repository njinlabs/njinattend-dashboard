import { configureStore } from "@reduxjs/toolkit";
import interfaceReducer from "./slices/interface";

const store = configureStore({
  reducer: {
    interface: interfaceReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
