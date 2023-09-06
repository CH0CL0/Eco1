import React, { useState } from "react";
import '../App.css';
import preguntas from '../preguntas/preguntas';
import { Link, Outlet } from "react-router-dom";
const Juego = () => {
  const [preguntasRestantes, setPreguntasRestantes] = useState([...preguntas]);
  const [preguntaActual, setPreguntaActual] = useState(null);
  const [respuestaUsuario, setRespuestaUsuario] = useState("");
  const [respuestaCorrecta, setRespuestaCorrecta] = useState(false);
  const [opcionesSeleccionadas, setOpcionesSeleccionadas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [juegoIniciado, setJuegoIniciado] = useState(false);

  const siguientePregunta = () => {
    if (preguntasRestantes.length > 0) {
      const preguntaActual = preguntasRestantes.shift();
      setPreguntaActual(preguntaActual);
      setRespuestaUsuario("");
      setRespuestaCorrecta(false);
      setOpcionesSeleccionadas([]);
      setShowModal(false);
    } else {
      console.log("No hay más preguntas disponibles.");
    }
  };

  const checkAnswer = () => {
    const { respuestaCorrecta, opciones } = preguntaActual;

    let juegoReiniciado = false; // Variable para verificar si el juego se ha reiniciado

    if (opciones && opciones.length > 0) {
      const alMenosUnaOpcionSeleccionada = opcionesSeleccionadas.some(
        (seleccionada) => seleccionada
      );

      if (alMenosUnaOpcionSeleccionada) {
        const opcionesCorrectas = opciones.map(
          (opcion) => opcion.trim().toLowerCase() === respuestaCorrecta.trim().toLowerCase()
        );
        const respuestasCorrectas = opcionesSeleccionadas.every(
          (seleccionada, index) => seleccionada === opcionesCorrectas[index]
        );
        setRespuestaCorrecta(respuestasCorrectas);
        setShowModal(true);

        if (respuestasCorrectas) {
          siguientePregunta();
        } else {
          // Si la respuesta es incorrecta, marcamos el juego como reiniciado
          juegoReiniciado = true;
        }
      } else {
        setRespuestaCorrecta(false);
        setShowModal(true);
      }
    } else {
      const respuestaCorrectaSeleccionada =
        respuestaUsuario.trim().toLowerCase() === respuestaCorrecta.trim().toLowerCase();
      setRespuestaCorrecta(respuestaCorrectaSeleccionada);
      setShowModal(true);

      if (respuestaCorrectaSeleccionada) {
        siguientePregunta();
      } else {
        // Si la respuesta es incorrecta, marcamos el juego como reiniciado
        juegoReiniciado = true;
      }
    }

    // Verificamos si el juego se ha reiniciado y, en ese caso, volvemos a la pantalla de inicio
    if (juegoReiniciado) {
      
    }
  };

  const handleInputChange = (event) => {
    setRespuestaUsuario(event.target.value);
  };

  const handleOptionClick = (index) => {
    const nuevasOpcionesSeleccionadas = [...opcionesSeleccionadas];
    nuevasOpcionesSeleccionadas[index] = !nuevasOpcionesSeleccionadas[index];
    setOpcionesSeleccionadas(nuevasOpcionesSeleccionadas);
  };

  const iniciarJuego = () => {
    setJuegoIniciado(true);
    siguientePregunta(); 
  };

  return (
    <div className="App">
      <header className="App-header">
        {preguntaActual && (
          <div>
            <p>{preguntaActual.pregunta}</p>
            {preguntaActual.opciones && preguntaActual.opciones.length > 0 ? (
              <div className="options">{preguntaActual.opciones.map((opcion, index) => (
                <button
                  key={index}
                  className={`option ${opcionesSeleccionadas[index] === true ? "selected" : ""}`}
                  onClick={() => handleOptionClick(index)}
                >
                  {opcion}
                </button>
              ))}
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  value={respuestaUsuario}
                  onChange={handleInputChange}
                  placeholder="Escribe tu respuesta"
                />
              </div>
            )}
            <button className="check-button" onClick={checkAnswer}>Verificar Respuestas</button>
          </div>
        )}
        {showModal && (
          <div className="modal">
            <p>{respuestaCorrecta ? "¡Genial! Lograste responder todas las preguntas con éxito" : "¡Incorrecto!"}</p>
            <button onClick={iniciarJuego}>Volver al inicio</button>
          </div>
        )}
      </header>
    </div>
  );
}

export default Juego;