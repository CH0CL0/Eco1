import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"; // Import useHistory
import '../App.css';
import preguntas from '../preguntas/preguntas';

const Juego = () => {
  const history = useHistory(); // Create a history object
  const [preguntasRestantes, setPreguntasRestantes] = useState([...preguntas]);
  const [preguntaActual, setPreguntaActual] = useState(null);
  const [respuestaUsuario, setRespuestaUsuario] = useState("");
  const [respuestaCorrecta, setRespuestaCorrecta] = useState(false);
  const [opcionesSeleccionadas, setOpcionesSeleccionadas] = useState([]);
  const [showModalCorrecto, setShowModalCorrecto] = useState(false);
  const [porcentajeAlcanzado, setPorcentajeAlcanzado] = useState(0);

  const seleccionarSiguientePregunta = () => {
    const preguntasOrdenadas = [...preguntasRestantes].sort(
      (a, b) => Math.abs(a.porcentaje - preguntaActual?.porcentaje) - Math.abs(b.porcentaje - preguntaActual?.porcentaje)
    );

    const siguientePregunta = preguntasOrdenadas.shift();

    if (siguientePregunta) {
      setPorcentajeAlcanzado(siguientePregunta.porcentaje);
      setPreguntaActual(siguientePregunta);
      setRespuestaUsuario("");
      setRespuestaCorrecta(false);
      setOpcionesSeleccionadas([]);
      setPreguntasRestantes(preguntasOrdenadas);
      setShowModalCorrecto(false);
    }
  };

  const handleNextQuestionClick = () => {
    seleccionarSiguientePregunta();
  };

  const handleBackToInicioClick = () => {
    // Use history.push to navigate to the "Inicio" view
    history.push("/inicio"); // Replace "/inicio" with the actual route for "Inicio"
  };

  useEffect(() => {
    if (preguntasRestantes.length > 0) {
      seleccionarSiguientePregunta();
    }
  }, [preguntasRestantes, seleccionarSiguientePregunta]);


  const checkAnswer = () => {
    const { respuestaCorrecta, opciones } = preguntaActual;

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

        if (respuestasCorrectas) {
          setShowModalCorrecto(true);
        } else {
          setShowModalCorrecto("Error. Has perdido el juego");
        }
      } else {
        setRespuestaCorrecta(false);
      }
    } else {
      const respuestaCorrectaSeleccionada =
        respuestaUsuario.trim().toLowerCase() === respuestaCorrecta.trim().toLowerCase();
      setRespuestaCorrecta(respuestaCorrectaSeleccionada);

      if (respuestaCorrectaSeleccionada) {
        setShowModalCorrecto(true);
      } else {
        // Handle incorrect answer here
        // Set an error message
        setShowModalCorrecto("Error. Has perdido el juego");
      }
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

        {showModalCorrecto && respuestaCorrecta && (
          <div className="modal">
            <p>"¡Genial! Lograste responder correctamente"</p>
            <button onClick={handleNextQuestionClick}>Siguiente Pregunta</button>
          </div>
        )}

        {showModalCorrecto && !respuestaCorrecta && (
          <div className="modal">
            <p>{showModalCorrecto}</p>
            <button onClick={handleBackToInicioClick}>Volver al inicio</button>
          </div>
        )}
      </header>
    </div>
  );
}

export default Juego;