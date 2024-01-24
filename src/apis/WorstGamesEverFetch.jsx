import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import SingleGame from "./SingelGameFetch";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const saveDataToFile = (data) => {
  const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
  saveAs(blob, "data.json");
};

const WorstGamesEver = () => {
  const apiKey = "e5af9c0ecbb74eb68b32eb1dc1142b2b";
  const apiUrl = "https://api.rawg.io/api/games";
  const [worstGames, setWorstGames] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState(null);

  useEffect(() => {
    const fetchWorstGames = async () => {
      try {
        const response = await fetch(
          `${apiUrl}?key=${apiKey}&ordering=metacritic`
        );
        const data = await response.json();
        console.log("API-Antwort:", data);
        if (!data || !data.results || data.results.length === 0) {
          console.error("Ungültige oder leere Daten empfangen");
          return;
        }

        saveDataToFile(data);

        setWorstGames(data.results);
      } catch (error) {
        console.error("Fehler bei der API-Anfrage:", error);
      }
    };

    fetchWorstGames();
  }, []);

  // Settings for the react-slick carousel
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 4,
  };

  const handleGameClick = (gameId) => {
    setSelectedGameId(gameId);
  };

  return (
    <div>
      {selectedGameId ? (
        <SingleGame gameId={selectedGameId} />
      ) : worstGames.length > 0 ? (
        <div>
          <h2 style={{ margin: "2rem", textAlign: "center" }}>
            Die schlechtesten Spiele aller Zeiten
          </h2>
          <Slider {...settings}>
            {worstGames.map((game) => (
              <div
                key={game.id}
                style={{ textAlign: "center" }}
                onClick={() => handleGameClick(game.id)}
              >
                <h3>{game.name}</h3>
                <p>Bewertung: {game.metacritic}%</p>
                {/* Weitere Informationen hier einfügen */}
                <img
                  src={game.background_image}
                  alt={game.name}
                  style={{ width: "180px", height: "100px", margin: "0 auto" }}
                />
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <div>Lade...</div>
      )}
    </div>
  );
};

export default WorstGamesEver;
