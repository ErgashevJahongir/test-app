import axios from "axios";
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const instance = axios.create({
  baseURL: `${BASE_URL}/`,
  headers: {
    "Content-Type": "application/json",
    timeout: 300000,
  },
});

export const api = ({ dispatch }) => {
  return next => {
    return action => {
      if (action.type !== "api/apiCall") {
        next(action);
        return;
      }
      next(action);
      const { url, method, data, onSuccess, params, onFail, contentType } = action.payload;
      instance({
        headers: { "Content-Type": contentType || "application/json" },
        url,
        method,
        data,
        params,
      })
        .then(res => {
          dispatch({
            type: onSuccess,
            payload: res.data,
          });
        })
        .catch(err => {
          dispatch({
            type: onFail,
            payload: { ...err?.response?.data, success: false },
          });
        });
    };
  };
};
