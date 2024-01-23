import { Link } from "react-router-dom";
import React from "react";

function Nav() {
  return (
    <nav>
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
    </nav>
  );
}

export default Nav;
