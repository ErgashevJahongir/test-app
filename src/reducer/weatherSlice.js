import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../instance";

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_APP_ID;

export const getWeather = createAsyncThunk("weathers/getWeathers", async cityName => {
  const res = await instance(
    `/weather?q=${cityName}&appid=${WEATHER_API_KEY}&lang=en&units=metric`
  );
  return res.data;
});

export const getWeatherWithLatLon = createAsyncThunk(
  "weathers/getWeatherswithLatLon",
  async data => {
    const { lat, lon } = data;
    const res = await instance(
      `/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&lang=en&units=metric`
    );
    return res.data;
  }
);

export const getCitysWeather = createAsyncThunk("citysWeathers/getWeathers", async cityName => {
  const res = await instance(`/find?q=${cityName}&appid=${WEATHER_API_KEY}&lang=en&units=metric`);
  return res.data;
});

const initialState = {
  weather: null,
  loading: false,
  citysWeather: null,
  citysWeatherMessage: null,
  citysLoading: false,
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    clearCitysWeather: state => {
      state.citysWeather = null;
      state.citysWeatherMessage = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(getWeather.pending, state => {
      state.loading = true;
    }),
      builder.addCase(getWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.weather = action.payload;
      }),
      builder.addCase(getWeather.rejected, state => {
        state.loading = false;
      });

    builder.addCase(getWeatherWithLatLon.pending, state => {
      state.loading = true;
    }),
      builder.addCase(getWeatherWithLatLon.fulfilled, (state, action) => {
        state.loading = false;
        state.weather = action.payload;
      }),
      builder.addCase(getWeatherWithLatLon.rejected, state => {
        state.loading = false;
      });

    builder.addCase(getCitysWeather.pending, state => {
      state.citysLoading = true;
    }),
      builder.addCase(getCitysWeather.fulfilled, (state, action) => {
        state.citysLoading = false;
        if (Array.isArray(action.payload?.list) && action.payload?.list.length === 0) {
          state.citysWeatherMessage = "City not found";
          state.citysWeather = null;
        } else {
          state.citysWeather = action.payload?.list;
          state.citysWeatherMessage = null;
        }
      }),
      builder.addCase(getCitysWeather.rejected, state => {
        state.citysLoading = false;
        state.citysWeather = null;
      });
  },
});

export const selectWeather = state => state.weather.weather;
export const selectCitysWeather = state => state.weather.citysWeather;
export const selectCitysWeatherMessage = state => state.weather.citysWeatherMessage;

export const { clearCitysWeather } = weatherSlice.actions;
export default weatherSlice.reducer;
