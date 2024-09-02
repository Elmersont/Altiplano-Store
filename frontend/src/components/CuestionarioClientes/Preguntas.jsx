import React from 'react';

const Preguntas = ({ question, options, onAnswer }) => {
  return (
    <div>
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

