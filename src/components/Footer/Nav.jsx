import React from "react";
import styled from "styled-components";
import XBox from "/src/images/XBox.png";
import PS from "./../../images/PlayStation.png";
import Pc from "./../../images/Pc.jpg";
import Epic from "./../../images/Epic.jpg";
import Riot from "./../../images/Riot.png";
import Steam from "./../../images/Steam.jpg";

// Styled Components
const Container = styled.nav`
  .game-container {
    /* Deine anderen Styles hier */
  }

  ul {
    list-style: none;
    padding: 0;
    display: flex;
        justify-content: space-evenly;
        margin-top: 2rem;

  }

  li {
    margin-right: 20px;
  }

  a {
    text-decoration: none;
  }
`;

const Image = styled.img`
  transition: transform 0.3s ease-out; /* Füge eine Transitionsanimation hinzu */

  &:hover {
    transform: translateY(-5px); /* Ändere die translateY-Werte nach Bedarf */
  }
`;

function Nav() {
  return (
    <Container>
      <h2>Game Store</h2>

      <ul>
        <li>
          <a href="https://www.xbox.com" target="_blank" rel="noopener noreferrer">
            <Image src={XBox} alt="XBox" />
          </a>
        </li>

        <li>
          <a href="https://www.playstation.com" target="_blank" rel="noopener noreferrer">
            <Image src={PS} alt="PlayStation" />
          </a>
        </li>

        <li>
          <a href="https://www.instant-gaming.com/de/" target="_blank" rel="noopener noreferrer">
            <Image className="w-12" src={Pc} alt="PC" />
          </a>
        </li>

        <li>
          <a href="https://www.epicgames.com" target="_blank" rel="noopener noreferrer">
            <Image src={Epic} alt="Epic" />
          </a>
        </li>

        <li>
          <a href="https://www.riotgames.com" target="_blank" rel="noopener noreferrer">
            <Image src={Riot} alt="Riot" />
          </a>
        </li>

        <li>
          <a href="https://store.steampowered.com" target="_blank" rel="noopener noreferrer">
            <Image src={Steam} alt="Steam" />
          </a>
        </li>
      </ul>
    </Container>
  );
}

export default Nav;
