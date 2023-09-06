import React, { useState, useEffect } from "react";
import '../App.css';
import preguntas from '../preguntas/preguntas';
//import { Link, Outlet } from "react-router-dom";
 
const Juego = () => {
  const [preguntasRestantes, setPreguntasRestantes] = useState([...preguntas]);
  const [preguntaActual, setPreguntaActual] = useState(null);
  const [respuestaUsuario, setRespuestaUsuario] = useState("");
  const [respuestaCorrecta, setRespuestaCorrecta] = useState(false);
  const [opcionesSeleccionadas, setOpcionesSeleccionadas] = useState([]);
  const [showModalCorrecto, setShowModalCorrecto] = useState(false);
  const [porcentajeAlcanzado, setPorcentajeAlcanzado] = useState(0);
  
  const seleccionarSiguientePregunta = () => {
    const preguntasOrdenadas = [...preguntasRestantes].sort(
      (a, b) => Math.abs(a.porcentaje - porcentaje) - Math.abs(b.porcentaje - porcentaje)
    );

    const preguntaActual = preguntasOrdenadas.shift();
    setPorcentajeAlcanzado(preguntaActual.porcentaje);
    setPreguntaActual(preguntaActual);
    setRespuestaUsuario("");
    setRespuestaCorrecta(false);
    setOpcionesSeleccionadas([]);
    setPreguntasRestantes(preguntasOrdenadas);
    setShowModalCorrecto(false);
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
        {showModalCorrecto && (
          <div className="modal">
            <p>"¡Genial! Lograste responder correctamente"</p>
            <button onClick={seleccionarSiguientePregunta}>Siguiente Pregunta</button>
          </div>
        )}
      </header>
    </div>
  );
}

export default Juego;