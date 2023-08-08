import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Sidebar({ mobileMenu, setMobileMenu }) {
  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <aside>
      <div
        onClick={() => {
          setMobileMenu(false);
        }}
        className="sidebarBg"
      />
      <div className={`sidebar ${windowSize[0] < 1024 ? (mobileMenu ? "open" : "close") : "open"}`}>
        <div className="sidebar__close-div">
          <button
            onClick={() => {
              setMobileMenu(false);
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
        <div>
          <form className="search-form">
            <input type="text" className="search-input" placeholder="Type location" />
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
        </div>
        <div className="city-content">
          <ul>
            <li>
              <Link to="#">Tashkent</Link>
            </li>
            <li>
              <Link to="#">Samarkand</Link>
            </li>
            <li>
              <Link to="#">Surkhandarya</Link>
            </li>
            <li>
              <Link to="#">Kashkadarya</Link>
            </li>
            <li>
              <Link to="#">Karakalpakstan</Link>
            </li>
            <li>
              <Link to="#">Khorezm</Link>
            </li>
            <li>
              <Link to="#">Navoiy</Link>
            </li>
            <li>
              <Link to="#">Namangan</Link>
            </li>
            <li>
              <Link to="#">Andijan</Link>
            </li>
            <li>
              <Link to="#">Fergana</Link>
            </li>
            <li>
              <Link to="#">Jizzakh</Link>
            </li>
            <li>
              <Link to="#">Bukhara</Link>
            </li>
            <li>
              <Link to="#">Sirdaryo</Link>
            </li>
          </ul>
        </div>
        <div className="sideber-hr">
          <hr />
        </div>
        <div className="deatail-content">
          <h3>Weather Deatail</h3>
          <ul>
            <li>
              <span>Cloudy</span>
              <span>0%</span>
            </li>
            <li>
              <span>Humidity</span>
              <span>18%</span>
            </li>
            <li>
              <span>Wind</span>
              <span>3.09 km/h</span>
            </li>
            <li>
              <span>Pressure</span>
              <span>1003 Pha</span>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
