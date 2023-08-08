import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { selectWeather } from "../reducer/weatherSlice";

function Layout() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const weather = useSelector(selectWeather);

  function getBgImage(type) {
    if (type === "Clear") {
      return "cloud-light";
    } else if (type === "Clouds") {
      return "cloud-dark";
    } else if (type === "Drizzle") {
      return "rain";
    } else if (type === "Rain") {
      return "rain";
    } else if (type === "Snow") {
      return "snow";
    } else {
      return "sunshine";
    }
  }

  return (
    <div className={`${mobileMenu && "menuOpen"} layout ${getBgImage(weather?.weather[0]?.main)}`}>
      <div className="mainDiv">
        <Navbar mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />
        <main>
          <Outlet />
        </main>
      </div>
      <Sidebar mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />
    </div>
  );
}

export default Layout;
