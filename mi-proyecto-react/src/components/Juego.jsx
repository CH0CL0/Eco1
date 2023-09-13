import React, { useState, useEffect } from "react";
import '../App.css';
import { Link } from "react-router-dom";
import preguntas from '../preguntas/preguntas';

const Juego = () => {
 
  const [preguntasRestantes, setPreguntasRestantes] = useState([...preguntas]);
  const [preguntaActual, setPreguntaActual] = useState(null);
  const [respuestaUsuario, setRespuestaUsuario] = useState("");
  const [respuestaCorrecta, setRespuestaCorrecta] = useState(false);
  const [opcionesSeleccionadas, setOpcionesSeleccionadas] = useState([]);
  const [showModalCorrecto, setShowModalCorrecto] = useState(false);
  const [porcentajeAlcanzado, setPorcentajeAlcanzado] = useState(0);


  const handleNextQuestionClick = () => {
    seleccionarSiguientePregunta();
  };

  const seleccionarSiguientePregunta = () => {
    const preguntasOrdenadas = [...preguntasRestantes].sort(
      (a, b) => Math.abs(a.porcentaje - preguntaActual?.porcentaje) - Math.abs(b.porcentaje - preguntaActual?.porcentaje)
    );

    console.log('Llega aunque incorrecta')
    const siguientePregunta = preguntasOrdenadas.shift();
    console.log(preguntasOrdenadas)

      console.log("siguiente pregunta")
      // setPorcentajeAlcanzado(siguientePregunta.porcentaje);
      setPreguntaActual(siguientePregunta);
      setRespuestaUsuario("");
      setRespuestaCorrecta(false);
      setOpcionesSeleccionadas([]);
      setPreguntasRestantes(preguntasOrdenadas);
      setShowModalCorrecto(false);
      console.log(showModalCorrecto)
  };

  useEffect(() => {
    if (preguntasRestantes.length > 0) {
      seleccionarSiguientePregunta();
    }
  }, 
  []);


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
          setShowModalCorrecto("Error. Has perdido el juego.");
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
        setShowModalCorrecto("Error. Has perdido el juego.");
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
        {preguntaActual ? (
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
                {/* ?? */}
                <input
                  type="text"
                  value={respuestaUsuario}
                  onChange={handleInputChange}
                  placeholder="Escribe tu respuesta"
                />
              </div>
            )}
            <button className="check-button" onClick={checkAnswer}>
              Verificar Respuestas
            </button>
          </div>
        ) : (
          <div>
            <p>
              ¡Genial, lograste responder todas las preguntas con éxito! Se nota que sabes mucho acerca del cambio climático.
            </p>
            <Link className="link-inicio" to="/">
              Volver al inicio
            </Link>
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
            <Link className="link-inicio" to="/">Volver al inicio</Link>
          </div>
        )}
      </header>
    </div>
  );
}

export default Juego;