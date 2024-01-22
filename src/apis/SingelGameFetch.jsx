// Einfach alle details über das Spiel anzeigen lassen

import React, { useEffect, useState } from 'react';


const SingleGame = ({ gameId }) => {
  const apiKey = "e5af9c0ecbb74eb68b32eb1dc1142b2b";
  const apiUrl = "https://api.rawg.io/api/games";
  const [game, setGame] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await fetch(`${apiUrl}/${gameId}?key=${apiKey}`);
        const data = await response.json();
        if (!data || !data.name) {
          console.error("Ungültige Daten empfangen");
          return;
        }
        setGame(data);
      } catch (error) {
        console.error("Fehler bei der API-Anfrage:", error);
      }
    };
  
    fetchGame();
  }, [gameId]);
  
  return (
    <div>
      {game ? (
        <div>
  <h2>{game?.name}</h2>
  <img
    src={game?.background_image}
    alt={game?.name}
    style={{ maxWidth: '300px', maxHeight: '300px' }}
  />
  <p>Beschreibung: {game.description}</p>
  <p>Veröffentlichungsdatum: {game?.released}</p>
  <p>Metacritic-Bewertung: {game?.metacritic}</p>
  <p>ESRB-Rating: {game?.esrb_rating?.name}</p>
  <p>Letztes Update: {game?.updated}</p>
  <p>Website: {game?.website}</p>
  <p>Bewertung: {game?.rating}</p>
  <p>Anzahl der Screenshots: {game?.screenshots_count}</p>
  <p>Anzahl der Filme: {game?.movies_count}</p>
  <p>Anzahl der Schöpfer: {game?.creators_count}</p>
  {/* mit fragezeigen kommt html mit, vielleicht fixen? */}
  
</div>

      ) : (
        <div>Lade...</div>
      )}
    </div>
  );
};

export default SingleGame;
