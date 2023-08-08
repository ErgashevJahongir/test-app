import { createSlice } from "@reduxjs/toolkit";
import { apiCall } from "../api";

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_APP_ID;

export const slice = createSlice({
  name: "weatherData",
  initialState: {
    weatherData: null,
    message: null,
    changeData: false,
  },
  reducers: {
    getFrom: (state, action) => {
      if (action.payload.success) {
        console.log(action.payload);
        state.weatherData = action.payload?.data;
      } else {
        state.message = action.payload.message;
        state.weatherData = null;
      }
      state.changeData = false;
    },
  },
});

export const getWeatherWithCity = cityName => {
  return apiCall({
    url: `weather?q=${cityName}&appid=${WEATHER_API_KEY}`,
    method: "get",
    onSuccess: slice.actions.getFrom.type,
    onFail: slice.actions.getFrom.type,
  });
};

export default slice.reducer;
