// SingelGameFetch.jsx

import React, { useEffect, useState } from "react";
import styled from "styled-components";

const GameContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const GameTitle = styled.h2`
  color: #333;
  font-size: 24px;
  margin-bottom: 10px;
`;

const GameImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 20px;
`;

const GameDescription = styled.div`
  color: #555;
  margin-bottom: 15px;

  p {
    margin-bottom: 8px;
  }
`;

const GameDetail = styled.p`
  color: #777;
  margin-bottom: 10px;
`;

const SingleGame = ({ gameId }) => {
  const apiKey = "e5af9c0ecbb74eb68b32eb1dc1142b2b";
  const apiUrl = "https://api.rawg.io/api/games";
  const [game, setGame] = useState(null);
  const [previousGame, setPreviousGame] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await fetch(`${apiUrl}/${gameId}?key=${apiKey}`);
        const data = await response.json();
        if (!data || !data.name) {
          console.error("Ungültige Daten empfangen");
          return;
        }
        setPreviousGame(game); // Speichere den vorherigen Zustand
        setGame(data);
      } catch (error) {
        console.error("Fehler bei der API-Anfrage:", error);
      }
    };

    fetchGame();
  }, [gameId]);

  

  return (
    <GameContainer>
      {game ? (
        <div>
          <GameTitle>{game?.name}</GameTitle>
          <GameImage src={game?.background_image} alt={game?.name} />
          <GameDescription
            dangerouslySetInnerHTML={{ __html: game.description }}
          />
          <GameDetail>Veröffentlichungsdatum: {game?.released}</GameDetail>
          <GameDetail>Metacritic-Bewertung: {game?.metacritic}</GameDetail>
          <GameDetail>ESRB-Rating: {game?.esrb_rating?.name}</GameDetail>
          <GameDetail>Letztes Update: {game?.updated}</GameDetail>
          <GameDetail>Website: {game?.website}</GameDetail>
          <GameDetail>Bewertung: {game?.rating}</GameDetail>
          <GameDetail>
            Anzahl der Screenshots: {game?.screenshots_count}
          </GameDetail>
          <GameDetail>Anzahl der Filme: {game?.movies_count}</GameDetail>
          <GameDetail>Anzahl der Schöpfer: {game?.creators_count}</GameDetail>
          <GameDetail>
            Verfügbare Stores:{" "}
            {game?.stores.map((store) => store.store.name).join(", ")}
          </GameDetail>
          
        </div>
      ) : (
        <div>Lade...</div>
      )}
    </GameContainer>
  );
};

export default SingleGame;
