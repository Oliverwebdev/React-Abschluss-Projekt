import React from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoImage from "/src/images/62ac88bb57b859791be72386_Logo playo.png";

function Logo() {
  return (
    <Link to="/">
      <div className="logo">
        <img src={LogoImage} alt="Logo" />
        <div>
          <h1>OLBERTA </h1>
          {/* <span className="hidden md:inline">Oliver Norbert Bita</span> */}
        </div>
      </div>
    </Link>
  );
}

export default Logo;
