// App.js
import React from 'react';
import styled from 'styled-components';

// Globale Styles als Komponenten
const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Arial', sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 0;
  }
`;

// Header-Komponente
const Header = styled.header`
  background-color: #333;
  color: white;
  padding: 20px;
  text-align: center;
`;

// Container-Komponente
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

function App() {
  return (
    <div>
      {/* Global Styles */}
      <GlobalStyles />

      {/* Header */}
      <Header>
        <h1>Willkommen auf unserer Seite</h1>
      </Header>

      {/* Hauptinhalt */}
      <Container>
        <p>Hier ist der Hauptinhalt der Seite...</p>
      </Container>
    </div>
  );
}

export default App;
