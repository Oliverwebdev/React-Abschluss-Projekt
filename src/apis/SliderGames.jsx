import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import SingleGame from "./SingelGameFetch";
import apiKey from "./api";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderGames = ({ title, data }) => {
  const [games, setGames] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.rawg.io/api/games?key=${apiKey}&ordering=-metacritic`
      );
      const jsonData = await response.json();
      setGames(jsonData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiPromise = fetch(
          `https://api.rawg.io/api/games?key=${apiKey}&ordering=-metacritic`
        ).then((response) => response.json());

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout")), 3000)
        );

        const dataFromApi = await Promise.race([apiPromise, timeoutPromise]);

        console.log("API response:", dataFromApi);

        if (
          !dataFromApi ||
          !dataFromApi.results ||
          dataFromApi.results.length === 0
        ) {
          console.error("API response not received. Using data.json.");
          setames(data.results);
        } else {
          setGames(dataFromApi.results);
        }
      } catch (error) {
        if (error.message === "Timeout") {
          console.error(
            "The API request has timed out. Using data from data.json."
          );
          setGames(data.results);
        } else {
          console.error("Error in API request:", error);
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
    slidesToShow: 3,
    slidesToScroll: 4,
  };

  const handleGameClick = (gameId) => {
    setSelectedGameId(gameId);
  };

  return (
    <div className="slider-game">
      {selectedGameId ? (
        <SingleGame gameId={selectedGameId} />
      ) : games.length > 0 ? (
        <div>
          <h2>{title}</h2>
          <Slider {...sliderSettings}>
            {games.map((game) => (
              <div
                className="wrapper"
                key={game.id}
                onClick={() => handleGameClick(game.id)}
              >
                <h3>{game.name}</h3>
                <p>
                  Bewertung: {game.metacritic}%
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

export default SliderGames;
