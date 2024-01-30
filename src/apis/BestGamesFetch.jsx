import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import SingleGame from "./SingelGameFetch";
import bestGamesData from "./datas/bestgamesdata.json";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import apiKey from "./api";
import Rating from "../components/Rating";

const BestGamesEver = () => {
  const [bestGames, setBestGames] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState(null);

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
          console.error("API response not received. Using bestgamesdata.json.");
          setBestGames(bestGamesData.results);
        } else {
          setBestGames(dataFromApi.results);
        }
      } catch (error) {
        if (error.message === "Timeout") {
          console.error(
            "The API request has timed out. Using data from bestgamesdata.json."
          );
          setBestGames(bestGamesData.results);
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
      ) : bestGames.length > 0 ? (
        <div>
          <h2>The best Games ever</h2>
          <Slider {...sliderSettings}>
            {bestGames.map((game) => (
              <div
                className="wrapper"
                key={game.id}
                onClick={() => handleGameClick(game.id)}
              >
                <h3>{game.name}</h3>
                <p>
                  Bewertung: {game.metacritic}%
                  <Rating
                    stars={
                      game.metacritic ? Math.round(game.metacritic / 20) : 0
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

export default BestGamesEver;
