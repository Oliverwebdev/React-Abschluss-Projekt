import { Link } from "react-router-dom";
import React from "react";
import Theme from "./Theme";
import Account from "./Account";

function Nav() {
  return (
    <nav>
      <div className="dropdown dropdown-hover -left-0.5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="mobile-nav-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-25  -translate-y-1 right-1  top-7"
        >
          <li className="w-full h-7">
            <Link to="/" className="text-sm">
              Home
            </Link>
          </li>
          <li className="w-full h-7">
            <Link to="/pc" className="text-sm">
              PC
            </Link>
          </li>
          <li className="w-full h-7">
            <Link to="/ps" className="text-sm">
              PlayStation
            </Link>
          </li>
          <li className="w-full h-7">
            <Link to="/xbox" className="text-sm">
              Xbox
            </Link>
          </li>
        </ul>
      </div>

      <ul>
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
      <Theme />
    </nav>
  );
}

export default Nav;
