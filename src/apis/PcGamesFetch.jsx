import React, { useEffect, useState } from "react";
import SingleGameFetch from "./SingelGameFetch";

const PcGamesFetch = () => {
  // State to store all fetched games
  const [allGames, setAllGames] = useState([]);
  console.log("allgames.", allGames);
  // State to store games to be displayed on the current page
  const [games, setGames] = useState([]);
  // State to store the ID of the selected game for details view
  const [selectedGameId, setSelectedGameId] = useState(null);
  // State to keep track of the current page
  const [currentPage, setCurrentPage] = useState(1);
  // Number of games to display per page
  const pageSize = 50;

  // Fetch all games when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = "e5af9c0ecbb74eb68b32eb1dc1142b2b";
        const platforms = "4";
        const totalPages = 1000; // for example, fetch 10 pages

        let allFetchedGames = [];

        for (let page = 1; page <= totalPages; page++) {
          const response = await fetch(
            `https://api.rawg.io/api/games?key=${apiKey}&platforms=${platforms}&page=${page}&page_size=${pageSize}`
          );

          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }

          const data = await response.json();

          if (!data.results) {
            throw new Error("Invalid data format");
          }

          allFetchedGames = [...allFetchedGames, ...data.results];
          console.log("allFetchedGames", allFetchedGames);
        }

        const sortedGames = allFetchedGames.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        setAllGames(sortedGames);
        setGames(sortedGames.slice(0, pageSize));
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []); // Run only once to fetch all games

  // Function to handle displaying details of a selected game
  const handleShowDetails = (gameId) => {
    setSelectedGameId(gameId);
  };

  // Function to handle loading the next page
  const handlePageChange = () => {
    // console.log("Next Page button clicked");
    // console.log("Current Page:", currentPage);

    const startIndex = currentPage * pageSize;
    const endIndex = startIndex + pageSize;

    // console.log("Start Index:", startIndex);
    // console.log("End Index:", endIndex);

    if (startIndex < allGames.length) {
      const nextPageGames = allGames.slice(startIndex, endIndex);

      // console.log("Next Page Games:", nextPageGames);

      setCurrentPage((prevPage) => prevPage + 1);

      setGames([...nextPageGames]);
      // console.log("New Page:", currentPage + 1);
      // console.log("Current Page:", currentPage);
    }
    console.log("kontroll", endIndex, allGames.length);
  };
  //PrevSite
  const handlePagePrev = () => {
    const prevPage = currentPage - 1;

    if (prevPage > 0) {
      const startIndex = (prevPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      const prevPageGames = allGames.slice(startIndex, endIndex);

      setCurrentPage(prevPage);
      setGames([...prevPageGames]);
    }
  };

  console.log(games);
  return (
    <div className="gamesContainer" style={{ display: "flex" }}>
      <p className="titelGames">PC Games</p>

      {/* Display the list of games */}
      <ul className="gamesList">
        {games.map((game) => (
          <li className="gamesCard" key={game.id}>
            <h2 className="gamesCardTitel">{game.name}</h2>
            <img
              className="gameImage"
              src={game.background_image}
              alt={game.name}
              style={{ maxWidth: "300px", maxHeight: "300px" }}
            />
            <p>Bewertung: {game.metacritic}%</p>
            <button onClick={() => handleShowDetails(game.id)}>Mehr...</button>
          </li>
        ))}
      </ul>

      {/* Display details of the selected game if any */}
      {selectedGameId && (
        <SingleGameFetch
          gameId={selectedGameId}
          onClose={() => setSelectedGameId(null)}
        />
      )}

      {/* Pagination - Button to load the next page */}

      <div className="pagination">
        <button onClick={handlePagePrev}>Prev Page</button>
        <button onClick={handlePageChange}>Next Page</button>
      </div>
    </div>
  );
};

export default PcGamesFetch;
