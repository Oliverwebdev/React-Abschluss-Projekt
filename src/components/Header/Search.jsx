import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Autosuggest from "react-autosuggest";
import apiKey from "../../apis/api";
import SearchGame from "../../apis/SearchGameFetch";

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchInput = styled.input.attrs((props) => ({
  type: "text",
}))`
  padding: 10px;
  margin-right: 5px;
  display: ${(props) => (props.isVisible ? "block" : "none")};
`;

const SearchButton = styled.button`
  padding: 10px;
  display: ${(props) => (props.isVisible ? "block" : "none")};
`;

function SearchBox() {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
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
    <SearchContainer>
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
      <SearchButton isVisible={isSearchVisible} className="btn join-item" onClick={onSearchSubmit}>
        Search
      </SearchButton>
      <div className="indicator">
        {selectedGame ? (
          <div>
            <button
              className="btn join-item"
              onClick={() => setSelectedGame(null)}
            >
              Zurück
            </button>
            <SearchGame gameId={selectedGame.id} />
          </div>
        ) : null}
      </div>
    </SearchContainer>
  );
}

export default SearchBox;
