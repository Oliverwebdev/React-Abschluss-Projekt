import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import SingleGame from "./SingelGameFetch";
import data from "./datas/newestgamedata.json";
import styled from "styled-components";
import apiKey from "./api";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Rating from "../components/Rating";

const NewestGames = () => {
  const [newestGames, setNewestGames] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://api.rawg.io/api/games?key=${apiKey}&ordering=released`;
        const apiPromise = fetch(url).then((response) => response.json());

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout")), 3000)
        );

        const dataFromApi = await Promise.race([apiPromise, timeoutPromise]);

        console.log("Daten erhalten:", dataFromApi);

        if (
          !dataFromApi ||
          !dataFromApi.results ||
          dataFromApi.results.length === 0
        ) {
          console.error(
            "API-Antwort nicht erhalten. Verwende Daten aus der importierten JSON-Datei."
          );
          setNewestGames(data.results); // Fix the typo here
        } else {
          console.log("Daten von der API erhalten.");
          setNewestGames(dataFromApi.results);
        }
      } catch (error) {
        if (error.message === "Timeout") {
          console.error(
            "Die API-Anfrage hat das Zeitlimit überschritten. Verwende Daten aus der importierten JSON-Datei."
          );
          setNewestGames(data.results); // Fix the typo here
        } else {
          console.error("Fehler bei der API-Anfrage:", error);
        }
      }
    };

    fetchData();
  }, []);

  // Settings for the react-slick carousel
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: window.innerWidth >= 760 ? 3 : 1,
    slidesToScroll: 4,
  };

  const handleGameClick = (gameId) => {
    setSelectedGameId(gameId);
  };

  return (
    <div className="slider-game">
      {selectedGameId ? (
        <SingleGame gameId={selectedGameId} />
      ) : newestGames.length > 0 ? (
        <div>
          <h2>The newest Games</h2>
          <Slider {...sliderSettings}>
            {newestGames.map((game) => (
              <div
                className="wrapper"
                key={game.id}
                onClick={() => handleGameClick(game.id)}
              >
                <h3>{game.name}</h3>
                <p>
                  Bewertung: {game.metacritic}%
                  <Rating
                    halfStars={
                      game.metacritic ? Math.round(game.metacritic / 10) : 0
                    }
                  />
                </p>

                {game.background_image &&
                !game.background_image.includes("error") ? (
                  <img src={game.background_image} alt={game.name} />
                ) : (
                  <p>Kein Bild verfügbar</p>
                )}
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <div className="loading-message">
          <span className="loading loading-spinner text-primary"></span>
          <span className="loading loading-spinner text-secondary"></span>
          <span className="loading loading-spinner text-accent"></span>
          <span className="loading loading-spinner text-neutral"></span>
          <span className="loading loading-spinner text-info"></span>
          <span className="loading loading-spinner text-success"></span>
          <span className="loading loading-spinner text-warning"></span>
          <span className="loading loading-spinner text-error"></span>
        </div>
      )}
    </div>
  );
};

export default NewestGames;
