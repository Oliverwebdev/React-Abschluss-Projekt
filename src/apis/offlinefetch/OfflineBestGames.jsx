import React, { useEffect, useState } from 'react';
import  data  from './data'; 

const BestGamesEver = () => {
  const [bestGames, setBestGames] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
   
        setBestGames(data.results);
      } catch (error) {
        console.error("Fehler beim Laden der Daten:", error);
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
          
          </div>
        ) : (
          <div>Lade...</div>
        )
      )}
    </div>
  );
};

export default BestGamesEver;
