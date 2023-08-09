import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getWeather, selectWeather } from "./reducer/weatherSlice";
import "./App.css";

function WeatherApp() {
  const dispatch = useDispatch();
  const weather = useSelector(selectWeather);

  useEffect(() => {
    dispatch(getWeather("Toshkent"));
  }, []);

  return (
    <section className="container">
      {weather && (
        <div className="content">
          <h1>{Math.round(weather?.main?.temp)}°</h1>
          <div className="content__city">
            <h3>{weather?.name}</h3>
            <span>10:36 - Tuesday, 22 Oct 19</span>
          </div>
          <div className="weather__image">
            <div>
              <img
                src={`https://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@4x.png`}
                alt="weather icon"
              />
            </div>
            <span>{weather?.weather[0]?.main}</span>
          </div>
        </div>
      )}
    </section>
  );
}

export default WeatherApp;
