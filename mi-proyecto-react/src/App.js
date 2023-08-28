import React, { Component } from 'react';
import './App.css';
//AGREGAR UN BOTON QUE DIGA MAS INFROMACION DESPUES DE LA RESPUESTA DE CADA PREGUNTA Y QUE LLEVE A OTRA PAGINA CON LA EXPLICACION(USANDO REACT NO SE QUE)
const preguntas = [
  {
    pregunta: '¿Cual de estos compuestos no pertenece a la lista?',
    opciones: ['CO2', 'CH4', 'N20', 'H20'],
    respuestaCorrecta: 'H20',
    explicacion: 'ya que no es un gas de efecto invernadero',
    porcentaje: '60'
  },
  //{
    //pregunta: 'Complete la siguiente serie de numeros: 2020,2023,2027,2032, * , 2044,2051',
    //respuestaCorrecta: 2038,
    //explicacion:'Si no se para el cambio climatico para 2038 el mundo va a explotar',
    //porcentaje: '70'
  //},
  {
    pregunta: 'Cual de las siguientes palabras no encaja en la siguiente seire:',
    opciones: ['Desolacion', 'Insolar', 'Consolador', 'Invernadero'],
    respuestaCorrecta: 'Invernadero',
    explicacion: 'Invernadero es la unica palabra que no tiene sol dentro de la palabra (poner mas info del sol)',
    porcentaje: '50'
  },
  //{
    //pregunta: 'Cual es la palabra mas larga de esta pregunta que no contiene ninguna de las letras de la palabra "Clima"',
    //respuestaCorrecta: 'que',
    //explicacion: '"es", "no" no contienen ninguna letra pero "que" es la mas larga.',
    //porcentaje: '40'
  //},
  {
    pregunta: 'Cualc del clos siguilentes vivens sen lel mhar',
    opciones: ['abra', 'eduza', 'eon', 'aca'],
    respuestaCorrecta: 'eduza',
    explicacion: 'La pregunta tiene letra de mas, y las respuestas letras de menos. M eduza es el unico animal que vive en el mar, ademas estas se ven grandemente afectadas por el cambio climatico.',
    porcentaje: 15
  },
  {
    pregunta: '¿Cual de las siguientes palabras tiene mas letras?',
    opciones: ['Mitigacion', 'Millonario'],
    respuestaCorrecta: 'Mitigacion',
    explicacion: 'En mitigacion, repite la letra i tres veces, por lo que tiene 8, ademas , la mitigacion es lo que todas las personas tenemos que buscar para asi contrarestar al cambio climatico',
    porcentaje: 30
  },
  {
    pregunta: 'Cual de los siguientes nombres no pertenece a la lista',
    opciones: ['Benjanim Baker ', 'Catherine Clark', 'Daniel Davis', 'Greta Thunberg'],
    respuestaCorrecta: 'Greta Thunberg',
    explicacion: 'Greta Thumberg. Es el unico nombre que no empieza por la misma inicial tanto su nombre como su apellido, ademas , es una gran activista en contra del cambio climatico.',
    porcentaje: 80
  },
  // Agrega más preguntas aquí
];
//obtener pregunta por porcentaje 
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
//aumenta el porcentaje y busca uno menor
  nextQuestion = () => {
    this.setState({
      preguntaActual: this.getRandomQuestion(),
      respuestaSeleccionada: null,
      respuestaCorrecta: false,
      showModal: false,
    });
  };
//agregar un boton que diga mas informacion despues de responder , ademas de tener la justificacion.
  render() {
    const { preguntaActual, respuestaSeleccionada, showModal } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1>ECO 1%</h1>
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
//mas preguntas
//Pregunta 3: ¿Cuál es el fenómeno climático extremo que se caracteriza por la elevación rápida del nivel del mar debido al derretimiento acelerado de los glaciares y capas de hielo?
//Respuesta: Este fenómeno se llama la "subida del nivel del mar" o el "incremento del nivel del mar".