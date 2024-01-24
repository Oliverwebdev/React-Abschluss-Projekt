import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import SingleGame from './SingelGameFetch'; 

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';



const BestGamesEver = () => {
  const apiKey = "e5af9c0ecbb74eb68b32eb1dc1142b2b";
  const apiUrl = "https://api.rawg.io/api/games";
  const [bestGames, setBestGames] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState(null);

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
