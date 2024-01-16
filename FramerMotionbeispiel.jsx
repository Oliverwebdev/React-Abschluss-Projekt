// Link zum Thema: https://www.framer.com/motion/introduction/



import React from 'react';
import { motion } from 'framer-motion';

const FramerMotionComponent = () => {
  return (
    <div>
      <h1>Framer Motion Beispiel</h1>
      <p>
        Framer Motion ist eine leistungsstarke und zugleich einfache
        Animationsbibliothek für React. Sie ermöglicht die Erstellung flüssiger
        Animationen und Interaktionen in deinen React-Anwendungen.
      </p>

      <h2>Grundlegende Konzepte</h2>
      <ul>
        <li>
          <strong>Variants:</strong> Definiere verschiedene Zustände einer
          Komponente und ihre zugehörigen Animationen.
        </li>
        <li>
          <strong>motion.div:</strong> Verwende motion.div (oder andere
          HTML-Tags) anstelle von div, um animierbare Komponenten zu erstellen.
        </li>
        <li>
          <strong>AnimatePresence:</strong> Komponente für das Hinzufügen und
          Entfernen von animierten Elementen.
        </li>
      </ul>

      <h2>Beispiel</h2>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.5 }}
      >
        <p>
          Diese Komponente wird mit Framer Motion animiert. Öffne die Seite und
          beobachte die Animation!
        </p>
      </motion.div>
    </div>
  );
};

export default FramerMotionComponent;
