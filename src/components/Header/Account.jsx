import React, { useState } from "react";
import Theme from "./Theme";
import Anmeldung from './Anmeldung'; // Importieren Sie Ihre Anmeldung-Komponente
import styled from 'styled-components';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
`;

function Account() {
  const [userLogged, setUserLogged] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className="account-container order-2 md:order-3">
      {!userLogged && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor" // SVG-Füllfarbe festlegen
          onClick={toggleModal}
          style={{
            cursor: 'pointer',
            width: '48px', // Größe des SVG-Icons
            height: '48px', // Größe des SVG-Icons
            stroke: 'currentColor', // SVG-Umrissfarbe festlegen
            strokeWidth: '1.5', // Dicke des SVG-Umrisses
            color: '#4A90E2', // Farbe des Icons
            transition: 'transform 0.3s ease', // Animation hinzufügen
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'} // Vergrößern beim Hover
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} // Zurücksetzen beim Verlassen
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      )}

      {isModalOpen && (
        <ModalBackground onClick={toggleModal}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <Anmeldung />
          </ModalContainer>
        </ModalBackground>
      )}

      <Theme />
    </div>
  );
}

export default Account;
