import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import SingleGame from "./SingelGameFetch";
import data from "./datas/worstgamesdata.json";
import apiKey from "./api";
import Rating from "../components/Rating";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const WorstGamesEver = () => {
  const [worstGames, setWorstGames] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = "https://api.rawg.io/api/games";

    const fetchData = async () => {
      try {
        const apiPromise = fetch(
          `${apiUrl}?key=${apiKey}&ordering=metacritic`
        ).then((response) => response.json());

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
            "API-Antwort nicht erhalten. Verwende worstgamesdata.json."
          );
          setWorstGames(data.results);
        } else {
          setWorstGames(dataFromApi.results);
        }
      } catch (error) {
        if (error.message === "Timeout") {
          console.error(
            "Die API-Anfrage hat das Zeitlimit überschritten. Verwende Daten aus worstgamesdata.json."
          );
          setWorstGames(data.results);
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
    speed: 500,
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
      ) : worstGames.length > 0 ? (
        <div>
          <h2>The Worst Games ever</h2>
          <Slider {...sliderSettings}>
            {worstGames.map((game) => (
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

export default WorstGamesEver;
