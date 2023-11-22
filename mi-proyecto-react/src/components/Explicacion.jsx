import React from 'react';
import { PreguntaActualContext } from '../context/PreguntaActualContext';
import './Explicacion.css'; // Importa la hoja de estilos
import { Link } from "react-router-dom";

function ExplicacionPregunta() {
  const { pregunta } = React.useContext(PreguntaActualContext);

  return (
    <div className="explicacion-container">
      <h2>Explicación de la Pregunta</h2>
      <p className="pregunta-text">La pregunta es "{pregunta.pregunta}"</p>
      <p>{pregunta.explicacion}</p>
      <Link to="/">Volver a intentar</Link>
    </div>
  );
}

export default ExplicacionPregunta;
