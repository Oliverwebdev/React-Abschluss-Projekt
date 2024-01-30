import React, { useEffect, useState } from "react";
import Theme from "./Theme";
// import Search from "./Search";

function Account() {
  const [userLogged, setUserLogged] = useState(true);
  const handleSearchBox = () => {
    const searchBox = document.querySelector(".search-box");
    searchBox.classList.toggle("hidden");
  };

  return (
    <div className="account-container order-2 md:order-3">
      <div className="search-container relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          onClick={() => handleSearchBox()}
        >
          <path
            fillRule="evenodd"
            d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
            clipRule="evenodd"
          />
        </svg>
        <div className="join search-box hidden">
          <input
            className="input input-bordered join-item"
            placeholder="Search..."
          />
          <button className="btn join-item btn-secondary">Search</button>
        </div>
      </div>

      {userLogged ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      ) : (
        <ul className="flex flex-wrap gap-4">
          <li>
            <a className="btn btn-primary-content">Login</a>
          </li>
          <li>
            <a className="btn btn-secondary">Register</a>
          </li>
        </ul>
      )}

      <Theme />
    </div>
  );
}

export default Account;
