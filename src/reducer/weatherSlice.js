import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../instance";

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_APP_ID;

export const getWeather = createAsyncThunk("weathers/getWeathers", async cityName => {
  return await instance(`/weather?q=${cityName}&appid=${WEATHER_API_KEY}`);
});

const initialState = {
  weather: null,
  loading: false,
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: {
    [getWeather.pending]: state => {
      state.loading = true;
    },
    [getWeather.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.weather = payload.data;
    },
    [getWeather.rejected]: state => {
      state.loading = false;
    },
  },
});

export const selectWeather = state => state.weather.weather;

export default weatherSlice.reducer;
