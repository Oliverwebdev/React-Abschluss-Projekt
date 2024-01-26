import React, { useEffect } from "react";
import stageImage from "./../images/spiderman.png";
import Indexmain from "../components/buildcomponents/Indexmain";

function Home() {

  return (
    <div>
      <div className="stage">
        <div className="stage-content">
          <h1>OLBERTA GAMES</h1>
          <p>
            
          

          Olberta, powered by Rawg API, is your hub for top games. We offer a comprehensive collection for PC, Xbox, and PlayStation, including the latest releases and less favored titles. The Rawg API integration ensures current and detailed gaming information.
          </p>
        </div>
        <img src={stageImage} alt="Spiderman" />
      </div>

      <Indexmain />
    </div>
  );
}

export default Home;
