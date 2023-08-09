import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCitysWeather,
  getCitysWeather,
  getWeather,
  getWeatherWithLatLon,
  selectCitysWeather,
  selectCitysWeatherMessage,
  selectWeather,
} from "../reducer/weatherSlice";

const useFocus = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus];
};

function Sidebar({ setMobileMenu, mobileMenu }) {
  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);
  const weather = useSelector(selectWeather);
  const citysWeather = useSelector(selectCitysWeather);
  const citysWeatherMessage = useSelector(selectCitysWeatherMessage);
  const dispatch = useDispatch();
  const [inputRef, setInputFocus] = useFocus();
  const [value, setValue] = useState("");
  const citys = [
    "Tashkent",
    "Samarkand",
    "Termez",
    "Qarshi",
    "Nukus",
    "Urgench",
    "Navoiy",
    "Namangan",
    "Andijan",
    "Fergana",
    "Jizzakh",
    "Bukhara",
    "Sirdaryo",
  ];

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  function onSubmit(e) {
    e.preventDefault();
    const { cityName } = e.target;
    dispatch(getCitysWeather(cityName.value));
  }

  function getWeatherData(lat, lon) {
    dispatch(getWeatherWithLatLon({ lat, lon }));
    dispatch(clearCitysWeather());
    setMobileMenu(false);
    windowSize[0] > 1024 && setInputFocus();
    setValue("");
  }

  function getWeatherDataWithCityName(cityName) {
    dispatch(getWeather(cityName));
    setMobileMenu(false);
  }

  return (
    <aside
      onClick={() => {
        dispatch(clearCitysWeather());
      }}
    >
      {windowSize[0] < 1024 && (
        <div
          onClick={() => {
            setMobileMenu(false);
            dispatch(clearCitysWeather());
          }}
          className="sidebarBg"
        />
      )}
      <div className={`sidebar ${windowSize[0] < 1024 ? (mobileMenu ? "open" : "close") : "open"}`}>
        <div className="sidebar__close-div">
          <button
            onClick={() => {
              setMobileMenu(false);
              dispatch(clearCitysWeather());
            }}
            type="button"
            className="close-button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="close-icon"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div style={{ position: "relative" }}>
          <form onSubmit={onSubmit} className="search-form">
            <input
              value={value}
              onChange={e => setValue(e.target.value)}
              type="text"
              id="cityName"
              className="search-input"
              placeholder="Type location"
              autoFocus={windowSize[0] >= 1024}
              ref={inputRef}
            />
            <button type="submit" className="search-button" title="Search">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="search-icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </form>
          {(citysWeather || citysWeatherMessage) && (
            <div className="citys">
              <ul>
                {citysWeather?.map(item => {
                  return (
                    <li
                      className="city"
                      key={item.id}
                      onClick={() => getWeatherData(item?.coord?.lat, item?.coord?.lon)}
                    >
                      <span>
                        {item.name}, {item.sys.country}{" "}
                        <img
                          className="country-icon"
                          src={`https://openweathermap.org/images/flags/${item.sys?.country?.toLowerCase()}.png`}
                          alt="country flag"
                        />
                      </span>
                      <span>
                        <img
                          className="weather-icon"
                          src={`https://openweathermap.org/img/wn/${item?.weather[0]?.icon}@4x.png`}
                          alt="weather icon"
                        />
                      </span>
                    </li>
                  );
                })}
                {citysWeatherMessage && (
                  <li style={{ textAlign: "center" }}>{citysWeatherMessage}</li>
                )}
              </ul>
            </div>
          )}
        </div>
        <div className="city-content">
          <ul>
            {citys.map((item, index) => {
              return (
                <li key={index} onClick={() => getWeatherDataWithCityName(item)}>
                  <Link to="#">{item}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="sideber-hr">
          <hr />
        </div>
        {weather && (
          <div className="deatail-content">
            <h3>Weather Deatail</h3>
            <ul>
              <li>
                <span>Cloudy</span>
                <span>{weather?.clouds?.all}%</span>
              </li>
              <li>
                <span>Humidity</span>
                <span>{weather?.main?.humidity}%</span>
              </li>
              <li>
                <span>Wind</span>
                <span>{weather?.wind?.speed} km/h</span>
              </li>
              <li>
                <span>Pressure</span>
                <span>{weather?.main?.pressure} Pha</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
