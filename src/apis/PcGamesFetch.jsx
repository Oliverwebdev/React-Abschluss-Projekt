import React, { useEffect, useState } from "react";
import SingleGameFetch from "./SingelGameFetch";

const PcGamesFetch = () => {
  // State to store all fetched games
  const [allGames, setAllGames] = useState([]);
  // State to store games to be displayed on the current page
  const [games, setGames] = useState([]);
  // State to store the ID of the selected game for details view
  const [selectedGameId, setSelectedGameId] = useState(null);
  // State to keep track of the current page
  const [currentPage, setCurrentPage] = useState(1);
  // Number of games to display per page
  const pageSize = 40;

  // Fetch all games when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = "e5af9c0ecbb74eb68b32eb1dc1142b2b";
        const platforms = "4";

        const response = await fetch(
          `https://api.rawg.io/api/games?key=${apiKey}&platforms=${platforms}&page_size=${pageSize}`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();

        if (!data.results) {
          throw new Error("Invalid data format");
        }

        // Sort games by name
        const sortedGames = data.results.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        // Set all games and display the first page initially
        setAllGames(sortedGames);
        setGames(sortedGames.slice(0, pageSize));
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [pageSize]); // Run only once to fetch all games

  // Function to handle displaying details of a selected game
  const handleShowDetails = (gameId) => {
    setSelectedGameId(gameId);
  };

  // Function to handle loading the next page
  const handlePageChange = () => {
    console.log("Next Page button clicked");
    // Calculate the start and end indices for the next page
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Ensure the start index is within bounds
    if (startIndex < allGames.length) {
      // Slice the next set of games from the allGames array
      const nextPageGames = allGames.slice(startIndex, endIndex);

      // Set the games state to the games for the next page
      setGames(nextPageGames);

      // Increment the currentPage state
      console.log("Current Page:", currentPage);
      setCurrentPage((prevPage) => prevPage + 1);
      console.log("New Page:", currentPage + 1);
    }
  };

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
        <button onClick={handlePageChange}>Next Page</button>
      </div>
    </div>
  );
};

export default PcGamesFetch;
