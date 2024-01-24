import React from 'react';
import BestGamesEver from '../../apis/BestGamesFetch';
import styled from 'styled-components';
import WorstGamesEver from '../../apis/WorstGamesEverFetch';
import NewestGames from '../../apis/NewestGamesFetch';

const Div = styled.div`
  background-color: #333;
  color: white;
  padding: 20px;

  text-align: center;
  
  width: 100%;
`;



function Indexmain() {
  return (
    <Div>
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

