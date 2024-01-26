import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import SingleGame from "./SingelGameFetch";
import bestGamesData from "./datas/bestgamesdata.json";
import styled from "styled-components";
import API_KEY from "./config";


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// ###################################################

// Styled components
const Container = styled.div`
  padding: 20px;
  text-align: center;
`;

const Heading = styled.h2`
  margin: 2rem;
  text-align: center;
  font-size: 24px;
  text-decoration: underline;
`;

const GameWrapper = styled.div`
  margin: 0 auto;
`;

const GameTitle = styled.h3`
  margin-top: 10px;
  font-size: 1.3rem;
`;

const MetacriticRating = styled.p`
  margin-top: 5px;
`;

const GameImage = styled.img`
  width: 180px;
  height: 100px;
  margin: 0 auto;
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 18px;
  margin: 20px;
`;
// ###################################################

// Fetching data from the API
// ###################################################

const BestGamesEver = () => {
  const [bestGames, setBestGames] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `https://api.rawg.io/api/games?key=${API_KEY}&ordering=-metacritic`;
        
        const apiPromise = fetch(apiUrl).then((response) => response.json());
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
  // ###################################################

  const handleGameClick = (gameId) => {
    setSelectedGameId(gameId);
  };

  // Settings for the react-slick carousel
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 4,
  };

  // ###################################################
  return (
    <Container>
      {selectedGameId ? (
        <SingleGame gameId={selectedGameId} />
      ) : bestGames.length > 0 ? (
        <div>
          <Heading>Die besten Spiele aller Zeiten</Heading>
          <Slider {...sliderSettings}>
            {bestGames.map((game) => (
              <motion.div>
                <GameWrapper
                  key={game.id}
                  onClick={() => handleGameClick(game.id)}
                >
                  <GameTitle>{game.name}</GameTitle>
                  <MetacriticRating>
                    Bewertung: {game.metacritic}%
                  </MetacriticRating>

                  {game.background_image &&
                  !game.background_image.includes("error") ? (
                    <GameImage src={game.background_image} alt={game.name} />
                  ) : (
                    <LoadingSpinner>
                    Lade...
                    <Spinner /> {/* Hier den Spinner einfügen */}
                  </LoadingSpinner>
                  )}
                </GameWrapper>
              </motion.div>
            ))}
          </Slider>
        </div>
      ) : (
        <LoadingMessage>Lade...</LoadingMessage>
      )}
    </Container>
  );
};

export default BestGamesEver;
