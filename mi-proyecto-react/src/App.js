//React
import React, { Component } from 'react';

//Bootstrap

//css
import './App.css';

//Other
import  preguntas from './preguntas/preguntas';

//AGREGAR UN BOTON QUE DIGA MAS INFROMACION DESPUES DE LA RESPUESTA DE CADA PREGUNTA Y QUE LLEVE A OTRA PAGINA CON LA EXPLICACION(USANDO REACT NO SE QUE)
//obtener pregunta por porcentaje 
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preguntasRestantes: preguntas.slice().sort((a, b) => a.porcentaje - b.porcentaje),
      preguntaActual: null,
      respuestaUsuario: "", // Almacenar la respuesta escrita por el usuario
      respuestaCorrecta: false,
      opcionesSeleccionadas: [], // Un array para rastrear las opciones seleccionadas
      showModal: false,
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
        respuestaUsuario: "", // Reiniciar la respuesta del usuario
        respuestaCorrecta: false,
        opcionesSeleccionadas: [], // Reiniciar las opciones seleccionadas
        showModal: false,
      });
    } else {
      // Si no hay más preguntas, puedes manejarlo de acuerdo a tus necesidades
      console.log("No hay más preguntas disponibles.");
    }
  };

  checkAnswer = () => {
    const { preguntaActual, respuestaUsuario, opcionesSeleccionadas } = this.state;
    const { respuestaCorrecta, opciones } = preguntaActual;
  
    // Verificar si la pregunta tiene opciones
    if (opciones && opciones.length > 0) {
      // Verificar si al menos una opción ha sido seleccionada
      const alMenosUnaOpcionSeleccionada = opcionesSeleccionadas.some((seleccionada) => seleccionada);
  
      if (alMenosUnaOpcionSeleccionada) {
        // Comparar las opciones seleccionadas por el usuario con las opciones correctas
        const opcionesCorrectas = opciones.map((opcion, index) =>
          opcion.trim().toLowerCase() === respuestaCorrecta.trim().toLowerCase()
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
        }
      } else {
        // Si ninguna opción ha sido seleccionada, marcar como respuesta incorrecta
        this.setState({
          respuestaCorrecta: false,
          showModal: true,
        });
      }
    } else {
      // Para respuestas de texto libre
      const respuestaCorrectaSeleccionada = respuestaUsuario.trim().toLowerCase() === respuestaCorrecta.trim().toLowerCase();
    
      this.setState({
        respuestaCorrecta: respuestaCorrectaSeleccionada,
        showModal: true,
      });
    
      if (respuestaCorrectaSeleccionada) {
        this.siguientePregunta();
      }
    }
  };
  

  handleInputChange = (event) => {
    // Actualizar la respuesta del usuario cuando escriba en el campo de entrada
    this.setState({
      respuestaUsuario: event.target.value,
    });
  };

  handleOptionClick = (index) => {
    // Actualizar el estado de opciones seleccionadas cuando el usuario hace clic en un botón de opción
    const nuevasOpcionesSeleccionadas = [...this.state.opcionesSeleccionadas];
    nuevasOpcionesSeleccionadas[index] = !nuevasOpcionesSeleccionadas[index];

    this.setState({
      opcionesSeleccionadas: nuevasOpcionesSeleccionadas,
    });
  };

  render() {
    const { preguntaActual, opcionesSeleccionadas, respuestaCorrecta, showModal } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1>ECO 1%</h1>
          {preguntaActual && (
            <div>
              <p>{preguntaActual.pregunta}</p>
              {/* Mostrar opciones para las preguntas con opciones */}
              {preguntaActual.opciones && preguntaActual.opciones.length > 0 ? (
                <div className="options">
                  {preguntaActual.opciones.map((opcion, index) => (
                    <button
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
              {/* Botón para verificar respuestas */}
              <button class="check-button" onClick={this.checkAnswer}>Verificar Respuestas</button>
            </div>
          )}
          {showModal && (
            <div className="modal">
              <p>{respuestaCorrecta ? "¡Correcto!" : "¡Incorrecto!"}</p>
              <button onClick={this.siguientePregunta}>Siguiente Pregunta</button>
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