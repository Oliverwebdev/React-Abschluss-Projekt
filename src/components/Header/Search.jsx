import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Autosuggest from "react-autosuggest";
import SingleGame from "../../apis/SingelGameFetch";

function SearchBox() {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const navigate = useNavigate(); // Hook zum Navigieren zwischen Routen

  const MAX_SUGGESTIONS = 3;

  const loadSuggestions = async (inputValue) => {
    try {
      const response = await fetch(
        `https://api.rawg.io/api/games?key=e5af9c0ecbb74eb68b32eb1dc1142b2b&search=${inputValue}`
      );
      const data = await response.json();
      setSuggestions(data.results || []);
    } catch (error) {
      console.error("Fehler beim Laden von Vorschlägen:", error);
    }
  };

  const loadGameDetails = async (gameId) => {
    try {
      const response = await fetch(`https://api.rawg.io/api/games/${gameId}?key=e5af9c0ecbb74eb68b32eb1dc1142b2b`);
      const data = await response.json();
      setSelectedGame(data);

      // Navigiere zur Game Details Route
      navigate(`/${gameId}`);
    } catch (error) {
      console.error("Fehler beim Laden von Spiel-Details:", error);
    }
  };

  const onSuggestionsFetchRequested = async ({ value }) => {
    await loadSuggestions(value);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion) => suggestion.name;

  const renderSuggestion = (suggestion) => <div>{suggestion.name}</div>;

  const shouldRenderSuggestions = (value) => value.trim().length > 2;

  const onSuggestionSelected = async (_, { suggestion }) => {
    await loadGameDetails(suggestion.id);
  };

  const inputProps = {
    placeholder: "Search",
    value,
    onChange: (_, { newValue }) => setValue(newValue),
  };

  return (
    <div className="join">
      <div>
        <Autosuggest
          suggestions={suggestions.slice(0, MAX_SUGGESTIONS)}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          onSuggestionSelected={onSuggestionSelected}
          inputProps={inputProps}
          shouldRenderSuggestions={shouldRenderSuggestions}
        />
      </div>

      <div className="indicator">
        {selectedGame ? (
          <div>
            <button className="btn join-item" onClick={() => setSelectedGame(null)}>
              Zurück
            </button>
            <SingleGame gameId={selectedGame.id} />
          </div>
        ) : (
          <button className="btn join-item" onClick={() => console.log(selectedGame)}>
            Search
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBox;
