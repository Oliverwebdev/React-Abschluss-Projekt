import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const WorstGamesEver = () => {
  const apiKey = "e5af9c0ecbb74eb68b32eb1dc1142b2b";
  const apiUrl = "https://api.rawg.io/api/games";
  const [worstGames, setWorstGames] = useState([]);

  useEffect(() => {
    const fetchWorstGames = async () => {
      try {
        const response = await fetch(`${apiUrl}?key=${apiKey}&ordering=metacritic`);
        const data = await response.json();
        console.log("API-Antwort:", data);
        if (!data || !data.results || data.results.length === 0) {
          console.error("Ungültige oder leere Daten empfangen");
          return;
        }
        setWorstGames(data.results);
      } catch (error) {
        console.error("Fehler bei der API-Anfrage:", error);
      }
    };

    fetchWorstGames();
  }, []);

  // Settings for the react-slick carousel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 4,
  };

  return (
    <div>
      {worstGames.length > 0 ? (
        <div>
          <h2>Die schlechtesten Spiele aller Zeiten</h2>
          <Slider {...settings}>
            {worstGames.map((game) => (
              <div key={game.id}>
                <h3>{game.name}</h3>
                <p>Bewertung: {game.metacritic}%</p>
                {/* Weitere Informationen hier einfügen */}
                <img
                  src={game.background_image}
                  alt={game.name}
                  style={{ maxWidth: '150px', maxHeight: '150px' }}
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
