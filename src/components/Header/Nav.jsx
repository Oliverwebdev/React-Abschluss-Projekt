import { useState } from "react";
import { Link } from "react-router-dom";

function Nav() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="order-3 md:order-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="mobile-nav-icon"
        onClick={() => setShowMenu(true)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>

      <ul className={showMenu ? "left-0" : "-left-full"}>
        <li className="md:hidden absolute top-10 right-5 z-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            onClick={() => setShowMenu(false)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/pc">PC</Link>
        </li>
        <li>
          <Link to="/ps">PlayStation</Link>
        </li>
        <li>
          <Link to="/xbox">Xbox</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
