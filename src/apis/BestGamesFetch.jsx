import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import SingleGame from './SingelGameFetch'; 
import bestGamesData from './datas/bestgamesdata.json';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const BestGamesEver = () => {
  const [bestGames, setBestGames] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // API request with a 3-second timeout
        const apiPromise = fetch("https://api.rawg.io/api/games?key=e5af9c0ecbb74eb68b32eb1dc1142b2b&ordering=-metacritic").then(
          (response) => response.json()
        );

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout")), 3000)
        );

        const dataFromApi = await Promise.race([apiPromise, timeoutPromise]);

        console.log("API response:", dataFromApi);

        if (!dataFromApi || !dataFromApi.results || dataFromApi.results.length === 0) {
          console.error("API response not received. Using bestgamesdata.json.");
          setBestGames(bestGamesData.results);
        } else {
          // Use API data
          setBestGames(dataFromApi.results);
        }
      } catch (error) {
        if (error.message === "Timeout") {
          console.error("The API request has timed out. Using data from bestgamesdata.json.");
          setBestGames(bestGamesData.results);
        } else {
          console.error("Error in API request:", error);
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
      ) : (
        bestGames.length > 0 ? (
          <div>
            <h2 style={{ margin: "2rem" }}>Die besten Spiele aller Zeiten</h2>
            <Slider {...settings}>
              {bestGames.map((game) => (
                <div key={game.id} style={{ textAlign: 'center' }} onClick={() => handleGameClick(game.id)}>
                  <h3>{game.name}</h3>
                  <p>Bewertung: {game.metacritic}%</p>
                  <img
                    src={game.background_image}
                    alt={game.name}
                    style={{ width: "180px", height: "100px", margin: '0 auto' }}
                  />
                </div>
              ))}
            </Slider>
          </div>
        ) : (
          <div>Lade...</div>
        )
      )}
    </div>
  );
};

export default BestGamesEver;
