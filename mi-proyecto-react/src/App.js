import React, { Component } from 'react';
import './App.css';

const preguntas = [
  {
    pregunta: '¿Cuál es la capital de Francia?',
    opciones: ['Londres', 'París', 'Madrid', 'Roma'],
    respuestaCorrecta: 'París',
  },
  {
    pregunta: '¿Cuántos continentes hay en el mundo?',
    opciones: ['4', '5', '6', '7'],
    respuestaCorrecta: '7',
  },
  // Agrega más preguntas aquí
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preguntaActual: this.getRandomQuestion(),
      respuestaSeleccionada: null,
      respuestaCorrecta: false,
      showModal: false,
    };
  }

  getRandomQuestion() {
    const randomIndex = Math.floor(Math.random() * preguntas.length);
    return preguntas[randomIndex];
  }

  checkAnswer = (opcion) => {
    const { respuestaCorrecta } = this.state.preguntaActual;
    const respuestaCorrectaSeleccionada = opcion === respuestaCorrecta;

    this.setState({
      respuestaSeleccionada: opcion,
      respuestaCorrecta: respuestaCorrectaSeleccionada,
      showModal: !respuestaCorrectaSeleccionada,
    });

    if (respuestaCorrectaSeleccionada) {
      this.nextQuestion();
    }
  };

  nextQuestion = () => {
    this.setState({
      preguntaActual: this.getRandomQuestion(),
      respuestaSeleccionada: null,
      respuestaCorrecta: false,
      showModal: false,
    });
  };

  render() {
    const { preguntaActual, respuestaSeleccionada, showModal } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1>Pregunta Random</h1>
          <p>{preguntaActual.pregunta}</p>
          <div className="options">
            {preguntaActual.opciones.map((opcion, index) => (
              <button
                key={index}
                className={`option ${respuestaSeleccionada === opcion ? 'selected' : ''}`}
                onClick={() => this.checkAnswer(opcion)}
              >
                {opcion}
              </button>
            ))}
          </div>
          {showModal && (
            <div className="modal">
              <p>{respuestaSeleccionada === preguntaActual.respuestaCorrecta ? '¡Correcto!' : '¡Incorrecto!'}</p>
              <button onClick={this.nextQuestion}>Siguiente Pregunta</button>
            </div>
          )}
        </header>
      </div>
    );
  }
}

export default App;
