import React from "react";
import BestGamesEver from "../../apis/BestGamesFetch";
import styled from "styled-components";
import WorstGamesEver from "../../apis/WorstGamesEverFetch";
import NewestGames from "../../apis/NewestGamesFetch";

function Indexmain() {
  return (
    <>
      <BestGamesEver />
      <br />
      <br />
      <WorstGamesEver />
      <br />
      <br />
      <NewestGames />
    </>
  );
}

export default Indexmain;
