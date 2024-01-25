import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import SingleGame from "./SingelGameFetch";
import data from "./datas/worstgamesdata.json";
import styled from "styled-components";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

const GameRating = styled.p`
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

const WorstGamesEver = () => {
  const apiKey = "e5af9c0ecbb74eb68b32eb1dc1142b2b";
  const apiUrl = "https://api.rawg.io/api/games";
  const [worstGames, setWorstGames] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiPromise = fetch(`${apiUrl}?key=${apiKey}&ordering=metacritic`).then(
          (response) => response.json()
        );

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout")), 3000)
        );

        const dataFromApi = await Promise.race([apiPromise, timeoutPromise]);

        console.log("Daten erhalten:", dataFromApi);

        if (!dataFromApi || !dataFromApi.results || dataFromApi.results.length === 0) {
          console.error("API-Antwort nicht erhalten. Verwende worstgamesdata.json.");
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
    slidesToShow: 3,
    slidesToScroll: 4,
  };

  const handleGameClick = (gameId) => {
    setSelectedGameId(gameId);
  };

  return (
    <Container>
      {selectedGameId ? (
        <SingleGame gameId={selectedGameId} />
      ) : worstGames.length > 0 ? (
        <div>
          <Heading>Die schlechtesten Spiele aller Zeiten</Heading>
          <Slider {...sliderSettings}>
            {worstGames.map((game) => (
              <GameWrapper key={game.id} onClick={() => handleGameClick(game.id)}>
                <GameTitle>{game.name}</GameTitle>
                <GameRating> Verfügbare Stores:{" "}
                  {game?.stores.map((store) => store.store.name).join(", ")}
                </GameRating>
                {game.background_image && !game.background_image.includes("error") ? (
                  <GameImage src={game.background_image} alt={game.name} />
                ) : (
                  <p>Kein Bild verfügbar</p>
                )}
              </GameWrapper>
            ))}
          </Slider>
        </div>
      ) : (
        <LoadingMessage>Lade...</LoadingMessage>
      )}
    </Container>
  );
};

export default WorstGamesEver;
