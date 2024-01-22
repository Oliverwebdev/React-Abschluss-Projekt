// schlechteste Spiele aller Zeiten

import React, { useEffect, useState } from 'react';

const WorstGamesEver = () => {
  const apiKey = "e5af9c0ecbb74eb68b32eb1dc1142b2b";
  const apiUrl = "https://api.rawg.io/api/games";
  const [worstGames, setWorstGames] = useState([]);

  useEffect(() => {
    const fetchWorstGames = async () => {
      try {
        const response = await fetch(`${apiUrl}?key=${apiKey}&ordering=metacritic`);
        const data = await response.json();
        console.log("API-Antwort:", data);
        if (!data || !data.results || data.results.length === 0) {
          console.error("Ungültige oder leere Daten empfangen");
          return;
        }
        setWorstGames(data.results);
      } catch (error) {
        console.error("Fehler bei der API-Anfrage:", error);
      }
    };

    fetchWorstGames();
  }, []);

  return (
    <div>
      {worstGames.length > 0 ? (
        <div>
          <h2>Die schlechtesten Spiele aller Zeiten</h2>
          {worstGames.map((game) => (
            <div key={game.id}>
              <h3>{game.name}</h3>
              <img
                src={game.background_image}
                alt={game.name}
                style={{ maxWidth: '300px', maxHeight: '300px' }}
              />
              <p>Bewertung: {game.metacritic}</p>
              {/* Weitere Informationen hier einfügen */}
            </div>
          ))}
        </div>
      ) : (
        <div>Lade...</div>
      )}
    </div>
  );
};

export default WorstGamesEver;
