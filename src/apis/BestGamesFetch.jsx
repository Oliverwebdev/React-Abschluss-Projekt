// Die besten Spiele jemals nach Metacritic-Bewertung

import React, { useEffect, useState } from 'react';

const BestGamesEver = () => {
  const apiKey = "e5af9c0ecbb74eb68b32eb1dc1142b2b";
  const apiUrl = "https://api.rawg.io/api/games";
  const [bestGames, setBestGames] = useState([]);

  useEffect(() => {
    const fetchBestGames = async () => {
      try {
        const response = await fetch(`${apiUrl}?key=${apiKey}&ordering=-metacritic`);
        const data = await response.json();
        console.log("API-Antwort:", data);
        if (!data || !data.results || data.results.length === 0) {
          console.error("Ungültige oder leere Daten empfangen");
          return;
        }
        setBestGames(data.results);
      } catch (error) {
        console.error("Fehler bei der API-Anfrage:", error);
      }
    };

    fetchBestGames();
  }, []);

  return (
    <div>
      {bestGames.length > 0 ? (
        <div>
          <h2>Die besten Spiele aller Zeiten</h2>
          {bestGames.map((game) => (
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

export default BestGamesEver;