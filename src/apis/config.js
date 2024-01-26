// config.js
const API_KEY = 'e5af9c0ecbb74eb68b32eb1dc1142b2b';
export default API_KEY;


// das einbauen dafür


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