import React from 'react';
import BestGamesEver from '../../apis/BestGamesFetch';
import styled from 'styled-components';
import WorstGamesEver from '../../apis/WorstGamesEverFetch';
import NewestGames from '../../apis/NewestGamesFetch';
import Background from '../Background';

const Div = styled.div`
  background-color: #333;
  color: white;
  padding: 20px;

  text-align: center;
  
  width: 100%;
`;

const CarouselContainer = styled.div`
  display: flex;
  
  justify-content: space-between;
  overflow-x: auto;
  margin-top: 20px; /* Abstand nach oben hinzufügen */
`;

function Indexmain() {
  return (
    <Div>
      {/* <Background /> */}
        <BestGamesEver />
        <br />
        <br />
        <WorstGamesEver />
        <br />
        <br />
        <NewestGames  />
    </Div>
  );
}

export default Indexmain;

