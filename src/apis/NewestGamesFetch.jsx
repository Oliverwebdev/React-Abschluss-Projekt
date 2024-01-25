import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import SingleGame from "./SingelGameFetch";
import data from "./datas/newestgamedata.json";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NewestGames = () => {
  const [newestGames, setNewestGames] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // API-Anfrage mit Timeout
        const apiPromise = fetch("https://api.rawg.io/api/games?key=e5af9c0ecbb74eb68b32eb1dc1142b2b&ordering=released").then(
          (response) => response.json()
        );

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout")), 3000)
        );

        const dataFromApi = await Promise.race([apiPromise, timeoutPromise]);

        console.log("Daten erhalten:", dataFromApi);

        if (!dataFromApi || !dataFromApi.results || dataFromApi.results.length === 0) {
          console.error("API-Antwort nicht erhalten. Verwende Daten aus der importierten JSON-Datei.");
          setNewestGames(data.results);
        } else {
          console.log("Daten von der API erhalten.");
          setNewestGames(dataFromApi.results);
        }
      } catch (error) {
        if (error.message === "Timeout") {
          console.error("Die API-Anfrage hat das Zeitlimit überschritten. Verwende Daten aus der importierten JSON-Datei.");
          setNewestGames(data.results);
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
    speed: 300,
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
      ) : newestGames.length > 0 ? (
        <div>
          <h2 style={{ margin: "2rem" }}>Die neuesten Spiele</h2>
          <Slider {...settings}>
            {newestGames.map((game) => (
              <div
                key={game.id}
                style={{ textAlign: "center" }}
                onClick={() => handleGameClick(game.id)}
              >
                <h3>{game.name}</h3>
                <p>Veröffentlichungsdatum: {game.released}</p>
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

export default NewestGames;
