import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Autosuggest from "react-autosuggest";
import SingleGame from "../../apis/SingelGameFetch";
import apiKey from "../../apis/api"; 

function SearchBox() {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const navigate = useNavigate();

  const MAX_SUGGESTIONS = 4;

  const loadSuggestions = async (inputValue) => {
    try {
      const response = await fetch(
        `https://api.rawg.io/api/games?key=${apiKey}&search=${inputValue}`
      );
      const data = await response.json();
      setSuggestions(data.results.slice(0, MAX_SUGGESTIONS) || []);
    } catch (error) {
      console.error("Fehler beim Laden von Vorschlägen:", error);
    }
  };

  const loadGameDetails = async (gameId) => {
    try {
      const response = await fetch(
        `https://api.rawg.io/api/games/${gameId}?key=${apiKey}`
      );
      const data = await response.json();
      setSelectedGame(data);

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

  const onSearchSubmit = () => {
    if (selectedGame) {
      navigate(`/${selectedGame.id}`);
    }
  };

  const inputProps = {
    placeholder: "Search",
    value,
    onChange: (_, { newValue }) => setValue(newValue),
  };

  return (
    <div className="join text-center">
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        shouldRenderSuggestions={shouldRenderSuggestions}
        onSuggestionSelected={onSuggestionSelected}
        inputProps={inputProps}
      />
      <button className="btn join-item" onClick={onSearchSubmit}>
        Search
      </button>
      <div className="indicator">
        {selectedGame ? (
          <div>
            <button
              className="btn join-item"
              onClick={() => setSelectedGame(null)}
            >
              Zurück
            </button>
            <SingleGame gameId={selectedGame.id} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default SearchBox;
