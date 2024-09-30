import React from 'react';
import NavbarAltiplano from '../Navbar';

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
    </div>
  );
};

export default Preguntas;

