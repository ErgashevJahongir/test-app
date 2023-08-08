import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./reducer/weatherSlice";

export default configureStore({
  reducer: {
    weather: weatherReducer,
  },
});
