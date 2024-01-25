import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import SingleGame from "./SingelGameFetch";
import data from "./datas/worstgamesdata.json";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const WorstGamesEver = () => {
  const apiKey = "e5af9c0ecbb74eb68b32eb1dc1142b2b";
  const apiUrl = "https://api.rawg.io/api/games";
  const [worstGames, setWorstGames] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiPromise = fetch(`${apiUrl}?key=${apiKey}&ordering=metacritic`).then(
          (response) => response.json()
        );

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout")), 3000)
        );

        const dataFromApi = await Promise.race([apiPromise, timeoutPromise]);

        console.log("Daten erhalten:", dataFromApi);

        if (!dataFromApi || !dataFromApi.results || dataFromApi.results.length === 0) {
          console.error("API-Antwort nicht erhalten. Verwende worstgamesdata.json.");
          setWorstGames(data.results);
        } else {
          setWorstGames(dataFromApi.results);
        }
      } catch (error) {
        if (error.message === "Timeout") {
          console.error("Die API-Anfrage hat das Zeitlimit überschritten. Verwende Daten aus worstgamesdata.json.");
          setWorstGames(data.results);
        } else {
          console.error("Fehler bei der API-Anfrage:", error);
        }
      }
    };

    fetchData();
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
