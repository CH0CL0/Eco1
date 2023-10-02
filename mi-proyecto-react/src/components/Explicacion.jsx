import React from 'react';
import { PreguntaActualContext } from '../context/PreguntaActualContext';
import './Explicacion.css'; // Importa la hoja de estilos

function ExplicacionPregunta() {
  const { pregunta, setPregunta } = React.useContext(PreguntaActualContext);

  return (
    <div className="explicacion-container">
      <h2>Explicación de la Pregunta</h2>
      <p className="pregunta-text">La pregunta es "{pregunta.pregunta}"</p>
      <p>{pregunta.explicacion}</p>
    </div>
  );
}

export default ExplicacionPregunta;
