import React from "react";
import BestGamesEver from "../../apis/BestGamesFetch";
import WorstGamesEver from "../../apis/WorstGamesEverFetch";
import NewestGames from "../../apis/NewestGamesFetch";
import SliderGames from "../../apis/SliderGames";
import bestGamesData from "./../../apis/datas/bestgamesdata.json";
import worstGamesData from "./../../apis/datas/worstgamesdata.json";
import newestGameData from "./../../apis/datas/newestgamedata.json";

function Indexmain() {
  return (
    <>
      {/* <SliderGames title="The best Games ever" data={bestGamesData} />
      <SliderGames title="The Worst Games ever" data={worstGamesData} />
      <SliderGames title="The newest Games" data={newestGameData} /> */}
      <BestGamesEver />
      <WorstGamesEver />
      <NewestGames />
    </>
  );
}

export default Indexmain;
