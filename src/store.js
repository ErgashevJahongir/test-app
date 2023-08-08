import { configureStore } from "@reduxjs/toolkit";
import { api } from "./instance";
import weatherReducer from "./reducer/weatherReducer";

export default configureStore({
  reducer: {
    weatherReducer,
  },
  middleware: [api],
});
