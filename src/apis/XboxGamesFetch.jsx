import React, { useEffect, useState } from "react";
import SingleGameFetch from "./SingelGameFetch";
import apiKey from "./api";

const XboxGamesFetch = () => {
  // Zustand zum Speichern aller heruntergeladenen Spiele
  const [allGames, setAllGames] = useState([]);

  // Zustand zum Speichern der Spiele, die auf der aktuellen Seite angezeigt werden sollen
  const [games, setGames] = useState([]);

  // Zustand zur Speicherung der ID des ausgewählten Spiels für die Detailansicht
  const [selectedGameId, setSelectedGameId] = useState(null);

  // Zustand zur Verfolgung der aktuellen Seite
  const [currentPage, setCurrentPage] = useState(1);

  // Anzahl der anzuzeigenden Spiele pro Seite
  const pageSize = 50;

  // Funktion zum Abrufen von Daten für eine bestimmte Seite
  const fetchPageData = async (page) => {
    try {
      // API-Schlüssel und Plattform einstellen
      // const apiKey = "18bbf57ee97d4e06b816ccd76c11d8dd";
      const platforms = "1" && "14" && "186";

      // Daten von der API basierend auf der angegebenen Seitenzahl und Seitengröße abrufen
      const response = await fetch(
        `https://api.rawg.io/api/games?key=${apiKey}&platforms=${platforms}&page=${page}&page_size=${pageSize}&ordering=name`
      );

      // Überprüfen der HTTP-Antwort
      if (!response.ok) {
        throw new Error(`Fehler: ${response.status}`);
      }

      // JSON-Daten abrufen
      const data = await response.json();

      // Überprüfen der Daten
      if (!data.results) {
        throw new Error("Ungültiges Datenformat");
      }

      // Spiele nach Name sortieren
      const sortedPageGames = data.results.sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      return sortedPageGames;
    } catch (error) {
      console.error(
        "Fehler beim Abrufen der Daten über die API:",
        error.message
      );
      // Bei einem Fehler auf die lokale Datei zurückgreifen
      return fetchLocalGameData();
    }
  };

  // Funktion zum Abrufen der lokalen Spieldaten
  const fetchLocalGameData = async () => {
    try {
      // Lokale Datei pcGamesLocal.json abrufen
      const localGameDataResponse = await fetch("./datas/xboxGamesLocal.json");

      if (!localGameDataResponse.ok) {
        throw new Error(
          `Fehler beim Abrufen der lokalen Daten: ${localGameDataResponse.status}`
        );
      }

      // JSON-Daten aus der lokalen Datei abrufen
      const localGameData = await localGameDataResponse.json();
      console.log(localGameData);
      return localGameData.results;
    } catch (error) {
      console.error(
        "Fehler beim Abrufen der lokalen Spieldaten:",
        error.message
      );
      return [];
    }
  };

  // Funktion zum Anzeigen der Details eines ausgewählten Spiels
  const handleShowDetails = (gameId) => {
    setSelectedGameId(gameId);
  };

  // Funktion zum Laden der nächsten Seite
  const handlePageChange = async () => {
    const nextPage = currentPage + 1;
    const nextPageGames = await fetchPageData(nextPage);
    updateGamesState(nextPageGames, nextPage);
  };

  // Funktion zum Laden der vorherigen Seite
  const handlePagePrev = async () => {
    const prevPage = currentPage - 1;
    if (prevPage > 0) {
      const prevPageGames = await fetchPageData(prevPage);
      updateGamesState(prevPageGames, prevPage);
    } else {
      console.log("Bereits auf der ersten Seite.");
    }
  };

  // Funktion zum Aktualisieren des Zustands mit Spielen und Seitenzahl
  const updateGamesState = (newGames, newPage) => {
    if (newGames.length > 0) {
      setCurrentPage(newPage);
      setGames(newGames);
    } else {
      console.log(`Keine Spiele auf der Seite ${newPage} verfügbar.`);
    }
  };

  // Initiale Daten abrufen, wenn die Komponente montiert wird
  useEffect(() => {
    const fetchData = async (page) => {
      try {
        const initialPageGames = await fetchPageData(page);
        setAllGames(initialPageGames);
        setGames(initialPageGames);
      } catch (error) {
        console.error(
          "Fehler beim Abrufen der initialen Daten:",
          error.message
        );
      }
    };

    fetchData(currentPage);
  }, [currentPage]);

  return (
    <div className="gamesContainer" style={{ display: "flex" }}>
      <p className="titelGames">PC Spiele</p>
      <p className="gameCount">{allGames.length} Titel</p>

      {/* Liste der Spiele anzeigen */}
      <ul className="gamesList">
        {games.map((game) => (
          <li className="gamesCard" key={game.id}>
            <h2 className="gamesCardTitel">{game.name}</h2>
            <img
              className="gameImage"
              src={game.background_image}
              alt={game.name}
            />
            {game.metacritic && <p>Bewertung: {game.metacritic}%</p>}
            <button onClick={() => handleShowDetails(game.id)}>More...</button>
          </li>
        ))}
      </ul>

      {/* Details des ausgewählten Spiels anzeigen, wenn vorhanden */}
      {selectedGameId && (
        <SingleGameFetch
          gameId={selectedGameId}
          onClose={() => setSelectedGameId(null)}
        />
      )}

      {/* Paginierung - Schaltfläche zum Laden der vorherigen Seite */}
      <div className="pagination">
        <button onClick={handlePagePrev}>Prev Page</button>
        {/* Paginierung - Schaltfläche zum Laden der nächsten Seite */}
        <button onClick={handlePageChange}>Next Page</button>
      </div>
    </div>
  );
};

export default XboxGamesFetch;
