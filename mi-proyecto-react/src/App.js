import React, { Component } from 'react';
import './App.css';
import preguntas from './preguntas/preguntas';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preguntasRestantes: preguntas.slice().sort((a, b) => a.porcentaje - b.porcentaje),
      preguntaActual: null,
      respuestaUsuario: "",
      respuestaCorrecta: false,
      opcionesSeleccionadas: [],
      showModal: false,
      juegoIniciado: false, 
    };
  }
  componentDidMount() {
    this.siguientePregunta();
  }
  siguientePregunta = () => {
    if (this.state.preguntasRestantes.length > 0) {
      const preguntaActual = this.state.preguntasRestantes.shift();
      this.setState({
        preguntaActual: preguntaActual,
        respuestaUsuario: "",
        respuestaCorrecta: false,
        opcionesSeleccionadas: [],
        showModal: false,
      });
    } else {
      console.log("No hay más preguntas disponibles.");
    }
  };
  checkAnswer = () => {
    const { preguntaActual, respuestaUsuario, opcionesSeleccionadas } = this.state;
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
        this.setState({
          respuestaCorrecta: respuestasCorrectas,
          showModal: true,
        });
  
        if (respuestasCorrectas) {
          this.siguientePregunta();
        } else {
          // Si la respuesta es incorrecta, marcamos el juego como reiniciado
          juegoReiniciado = true;
        }
      } else {
        this.setState({
          respuestaCorrecta: false,
          showModal: true,
        });
      }
    } else {
      const respuestaCorrectaSeleccionada =
        respuestaUsuario.trim().toLowerCase() === respuestaCorrecta.trim().toLowerCase();
      this.setState({
        respuestaCorrecta: respuestaCorrectaSeleccionada,
        showModal: true,
      });
  
      if (respuestaCorrectaSeleccionada) {
        this.siguientePregunta();
      } else {
        // Si la respuesta es incorrecta, marcamos el juego como reiniciado
        juegoReiniciado = true;
      }
    }
  
    // Verificamos si el juego se ha reiniciado y, en ese caso, volvemos a la pantalla de inicio
    if (juegoReiniciado) {
      this.setState({
        juegoIniciado: false,
      });
    }
  };

  siguientePregunta = () => {
  if (this.state.preguntasRestantes.length > 0) {
    const preguntaActual = this.state.preguntasRestantes.shift();
    this.setState({
      preguntaActual: preguntaActual,
      respuestaUsuario: "",
      respuestaCorrecta: false,
      opcionesSeleccionadas: [],
      showModal: false,
    });
  } else {
    console.log("No hay más preguntas disponibles.");
    // Verificamos si el juego se ha reiniciado y volvemos a la pantalla de inicio
    if (this.state.juegoIniciado) {
      this.setState({
        juegoIniciado: false,
      });
    }
  }
};
  

  handleInputChange = (event) => {
    this.setState({
      respuestaUsuario: event.target.value,
    });
  };

  handleOptionClick = (index) => {
    const nuevasOpcionesSeleccionadas = [...this.state.opcionesSeleccionadas];
    nuevasOpcionesSeleccionadas[index] = !nuevasOpcionesSeleccionadas[index];
    this.setState({
      opcionesSeleccionadas: nuevasOpcionesSeleccionadas,
    });
  };

  iniciarJuego = () => {
    this.setState({
      juegoIniciado: true,
    });
    this.siguientePregunta(); 
  };

  render() {
    const { preguntaActual, opcionesSeleccionadas, respuestaCorrecta, showModal, juegoIniciado } = this.state;

    if (!juegoIniciado) {
      // Si el juego aún no ha comenzado, mostrar la pantalla de inicio
      return (
        <div className="App">
          <header className="App-header">
            <h1>Eco1</h1>
            <button className="start-button" onClick={this.iniciarJuego}>Jugar</button>
          </header>
        </div>
      );
    }
      return (
        <div className="App">
          <header className="App-header">
            {preguntaActual && (
            <div>
              <p>{preguntaActual.pregunta}</p>
              {preguntaActual.opciones && preguntaActual.opciones.length > 0 ? (
                <div className="options">{preguntaActual.opciones.map((opcion, index) => (<button
                      key={index}
                      className={`option ${
                      opcionesSeleccionadas[index] === true ? "selected" : ""
                      }`}
                      onClick={() => this.handleOptionClick(index)}
                    >
                      {opcion}
                    </button>
                  ))}
                </div>
              ) : (
                <div>
                  <input
                    type="text"
                    value={this.state.respuestaUsuario}
                    onChange={this.handleInputChange}
                    placeholder="Escribe tu respuesta"
                  />
                </div>
              )}
              <button class="check-button" onClick={this.checkAnswer}>Verificar Respuestas</button>
            </div>
          )}
          {showModal && (
            <div className="modal">
              <p>{respuestaCorrecta ? "Genial! Lograste responder todas las preguntas con éxito" : "¡Incorrecto!"}</p>
              <button onClick={this.iniciarJuego}>Volver al inicio</button>
            </div>
          )}
        </header>
      </div>
    );
  }
}

export default App;