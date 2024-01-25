import React, { useEffect, useState } from "react";
import SingleGameFetch from "./SingelGameFetch";

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

  // Xbox-Plattformkennung
  const xboxPlatform = "1" && "14" && "186"; // Die genaue Kennung kann variieren, überprüfen Sie die RAWG API-Dokumentation

  // Funktion zum Abrufen von Daten für eine bestimmte Seite
  const fetchPageData = async (page, platform) => {
    try {
      // API-Schlüssel und Plattform einstellen
      const apiKey = "e5af9c0ecbb74eb68b32eb1dc1142b2b";

      // Daten von der API basierend auf der angegebenen Seitenzahl und Seitengröße abrufen
      const response = await fetch(
        `https://api.rawg.io/api/games?key=${apiKey}&platforms=${xboxPlatform}&page=${page}&page_size=${pageSize}`
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
      console.error("Fehler beim Abrufen der Daten:", error.message);
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

    try {
      // Daten für die nächste Seite abrufen
      const nextPageGames = await fetchPageData(nextPage, xboxPlatform);

      // Überprüfen, ob neue Spiele auf der nächsten Seite vorhanden sind
      if (nextPageGames.length > 0) {
        setCurrentPage(nextPage);
        setGames(nextPageGames);
      } else {
        console.log("Keine weiteren Spiele auf der nächsten Seite verfügbar.");
      }
    } catch (error) {
      console.error(
        "Fehler beim Abrufen der Daten für die nächste Seite:",
        error.message
      );
    }
  };

  // Funktion zum Laden der vorherigen Seite
  const handlePagePrev = async () => {
    const prevPage = currentPage - 1;

    if (prevPage > 0) {
      try {
        // Daten für die vorherige Seite abrufen
        const prevPageGames = await fetchPageData(prevPage, xboxPlatform);

        // Überprüfen, ob Spiele auf der vorherigen Seite vorhanden sind
        if (prevPageGames.length > 0) {
          setCurrentPage(prevPage);
          setGames(prevPageGames);
        } else {
          console.log("Keine Spiele auf der vorherigen Seite verfügbar.");
        }
      } catch (error) {
        console.error(
          "Fehler beim Abrufen der Daten für die vorherige Seite:",
          error.message
        );
      }
    } else {
      console.log("Bereits auf der ersten Seite.");
    }
  };

  // Initiale Daten abrufen, wenn die Komponente montiert wird
  useEffect(() => {
    fetchPageData(currentPage, xboxPlatform)
      .then((initialPageGames) => {
        setAllGames(initialPageGames);
        setGames(initialPageGames);
      })
      .catch((error) => {
        console.error(
          "Fehler beim Abrufen der initialen Daten:",
          error.message
        );
      });
  }, [currentPage]);

  return (
    <div className="gamesContainer" style={{ display: "flex" }}>
      <p className="titelGames">Xbox Spiele</p>
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
              style={{ maxWidth: "250px", maxHeight: "250px" }}
            />
            <p>Bewertung: {game.metacritic}%</p>
            <button onClick={() => handleShowDetails(game.id)}>Mehr...</button>
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

      {/* Paginierung - Schaltfläche zum Laden der nächsten Seite */}
      <div className="pagination">
        <button onClick={handlePagePrev}>Prev Page</button>
        {/* Paginierung - Schaltfläche zum Laden der nächsten Seite */}
        <button onClick={handlePageChange}>Next Page</button>
      </div>
    </div>
  );
};

export default XboxGamesFetch;
