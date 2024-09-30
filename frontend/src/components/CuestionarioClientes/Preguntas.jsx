import React from 'react';
import NavbarAltiplano from '../Navbar';
import FooterAltiplano from '../Footer';

const Preguntas = ({ question, options, onAnswer }) => {
  return (
    <div>
      <NavbarAltiplano />
      <h2>{question}</h2>
      {options.map(option => (
        <button key={option} onClick={() => onAnswer(option)} className="option-button">
          {option}
        </button>
      ))}
      <FooterAltiplano />
    </div>
  );
};

export default Preguntas;

