import React from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoImage from "/src/images/62ac88bb57b859791be72386_Logo playo.png";

function Logo() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    // Hier navigierst du zur Home-Seite, wenn das Logo angeklickt wird
    navigate("/");
  };

  return (
    <div className="logo order-1" onClick={handleLogoClick}>
      <Link to="/React-Abschluss-Projekt/">
        <img src={LogoImage} alt="Logo" />
        <div>
          <h1>OLBERTA</h1>
          {/* <span className="hidden md:inline">Oliver Norbert Bita</span> */}
        </div>
      </Link>
    </div>
  );
}

export default Logo;
