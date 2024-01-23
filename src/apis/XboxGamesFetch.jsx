import React, { useEffect, useState } from "react";

const XboxGamesFetch = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = "e5af9c0ecbb74eb68b32eb1dc1142b2b"; // Cseréld le a saját API kulcsodra
        const platforms = "1"; // PC platform kódja a RAWG API-ban: 4
        const pageSize = 10; // Opcionális: lekérdezési oldalonkénti játékok száma

        const response = await fetch(
          `http://localhost:3001/api/games?key=${apiKey}&platforms=${platforms}&page_size=${pageSize}`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();

        // Spiele nach Namen sortieren
        const sortedGames = data.results.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        setGames(sortedGames);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="gamesContainer" style={{ display: "flex" }}>
      <p className="titelGames">XBOX Games</p>

      <ul className="gamesList">
        {games.map((game) => (
          <li className="gamesCard" key={game.id}>
            <h2>{game.name}</h2>
            <img
              src={game.background_image}
              alt={game.name}
              className="gameImage"
            />
            <p>Bewertung: {game.metacritic}%</p>
            <button>Mehr...</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default XboxGamesFetch;
