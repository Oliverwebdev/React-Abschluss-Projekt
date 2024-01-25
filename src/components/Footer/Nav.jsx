import React from "react";
import XBox from "/src/images/XBox.png";
import PS from "./../../images/PlayStation.png";
import Pc from "./../../images/Pc.jpg";
import Epic from "./../../images/Epic.jpg";
import Riot from "./../../images/Riot.png";
import Steam from "./../../images/Steam.jpg";

function Nav() {
  return (
    <nav className="game-container">
      <h2>Game Store</h2>

      <ul>
        <li>
          <img src={XBox} alt="" />
        </li>

        <li>
          <img src={PS} alt="" />
        </li>

        <li>
          <img className="w-12" src={Pc} alt="" />
        </li>

        <li>
          <img src={Epic} alt="Epic" />
        </li>

        <li>
          <img src={Riot} alt="Riot" />
        </li>

        <li>
          <img src={Steam} alt="Steam" />
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
