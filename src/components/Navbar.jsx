import { Link } from "react-router-dom";
import "./layout.css";

function Navbar({ setMobileMenu }) {
  return (
    <header className="container">
      <nav className="navbar">
        <Link to="/" className="logo">
          <h4>The.Weather</h4>
        </Link>
        <button
          onClick={() => {
            setMobileMenu(true);
          }}
          type="button"
          className="navbar__burger"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="bars-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
