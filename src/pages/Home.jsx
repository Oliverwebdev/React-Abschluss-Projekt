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
            Olberta is a website where you can find the best games for your
            console. We have a collection of the best games for PC, Xbox and
            PlayStation. You can also find the newest games and the worst games
            ever.
          </p>
        </div>
        <img src={stageImage} alt="Spiderman" />
      </div>

      <Indexmain />
    </div>
  );
}

export default Home;
