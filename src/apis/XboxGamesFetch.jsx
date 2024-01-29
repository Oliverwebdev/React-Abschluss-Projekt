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
  // Zustand für die Anzahl der Spiele pro Seite
  const [gamesPerPage, setGamesPerPage] = useState(10); // Standardwert: 10 pro Seite
  // Zustand zum Speichern der ausgewählten Xbox-Plattform
  const [platform, setPlatform] = useState("80"); // Standardmäßig Xbox One
  // Anzahl der anzuzeigenden Spiele pro Seite
  const pageSizeOptions = [10, 20, 30, 40];

  // Xbox-Plattformen
  const platforms = [
    { id: "1", name: "Xbox" },
    { id: "14", name: "Xbox 360" },
    { id: "80", name: "Xbox One" },
    { id: "186", name: "Xbox Series X/S" },
  ];

  // Funktion zum Abrufen von Daten für eine bestimmte Seite
  const fetchPageData = async (page) => {
    try {
      const response = await fetch(
        `https://api.rawg.io/api/games?key=${apiKey}&platforms=${platform}&page=${page}&page_size=${gamesPerPage}&ordering=name`
      );

      if (!response.ok) {
        throw new Error(`Fehler: ${response.status}`);
      }

      const data = await response.json();

      if (!data.results) {
        throw new Error("Ungültiges Datenformat");
      }

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
      const localGameDataResponse = await fetch("./datas/xboxGamesLocal.json");

      if (!localGameDataResponse.ok) {
        throw new Error(
          `Fehler beim Abrufen der lokalen Daten: ${localGameDataResponse.status}`
        );
      }

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

  // Funktion zum Ändern der Anzahl der Spiele pro Seite
  const handleGamesPerPageChange = (event) => {
    setGamesPerPage(parseInt(event.target.value));
  };

  // Funktion zum Ändern der ausgewählten Xbox-Plattform
  const handlePlatformChange = (event) => {
    setPlatform(event.target.value);
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
  }, [currentPage, gamesPerPage, platform]);

  return (
    <div className="gamesContainer">
      <p className="titelGames">Xbox Games</p>

      {/* Dropdown-Menü für die Auswahl der Xbox-Plattform */}
      <select
        className="dropdown-pg"
        value={platform}
        onChange={handlePlatformChange}
      >
        {platforms.map((platformOption) => (
          <option key={platformOption.id} value={platformOption.id}>
            {platformOption.name}
          </option>
        ))}
      </select>

      {/* Dropdown-Menü für die Anzahl der Spiele pro Seite */}
      <select
        className="dropdown-pg"
        value={gamesPerPage}
        onChange={handleGamesPerPageChange}
      >
        {pageSizeOptions.map((option) => (
          <option key={option} value={option}>
            {option} per Page
          </option>
        ))}
      </select>

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
      </div>
      {/* Paginierung - Schaltfläche zum Laden der nächsten Seite */}
      <div className="pagination">
        <button onClick={handlePageChange}>Next Page</button>
      </div>
    </div>
  );
};

export default XboxGamesFetch;
