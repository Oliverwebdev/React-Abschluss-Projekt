import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Theme from "./Theme";
import Search from "./Search";

function Account() {
  return (
    <div className="account-container">
      <Search />
      <div className="dropdown dropdown-hover">
        <div tabIndex={0} role="button" className="btn m-1">
          <FontAwesomeIcon icon={faUser} />
        </div>

        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <a>Login</a>
          </li>
          <li>
            <a>Register</a>
          </li>
        </ul>
      </div>
      <Theme />
    </div>
  );
}

export default Account;
