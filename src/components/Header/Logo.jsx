import React from "react";
import { useNavigate } from "react-router-dom";
import LogoImage from "/src/images/62ac88bb57b859791be72386_Logo playo.png";

function Logo() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/React-Abschluss-Projekt/");
  };

  return (
    <div className="logo" onClick={goHome} style={{ cursor: "pointer" }}>
      <img src={LogoImage} alt="Logo" />
      <div>
        <h1>OLBERTA</h1>
        <span>Games</span>
      </div>
    </div>
  );
}

export default Logo;
