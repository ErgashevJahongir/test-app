import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout() {
  const [mobileMenu, setMobileMenu] = useState(false);
  return (
    <div className={`${mobileMenu && "menuOpen"} layout cloud-light`}>
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
