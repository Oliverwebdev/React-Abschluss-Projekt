import React from "react";
import { Link } from "react-router-dom";

function PlatformRoutes() {
  return (
    <div className="platformContainer">
      <Link to="/pc" className="platformLink">
        PC
      </Link>

      <Link to="/playstation" className="platformLink">
        PLAYSTATION
      </Link>

      <Link to="/xbox" className="platformLink">
        XBOX
      </Link>
    </div>
  );
}

export default PlatformRoutes;
