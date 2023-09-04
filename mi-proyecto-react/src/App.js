import React, { Component } from 'react';
import './App.css';
//AGREGAR UN BOTON QUE DIGA MAS INFROMACION DESPUES DE LA RESPUESTA DE CADA PREGUNTA Y QUE LLEVE A OTRA PAGINA CON LA EXPLICACION(USANDO REACT NO SE QUE)
const preguntas = [

  {
    pregunta: 'Cualc del clos siguilentes vivens sen lel mhar',
    opciones: ['abra', 'eduza', 'eon', 'aca'],
    respuestaCorrecta: 'eduza',
    explicacion: 'La pregunta tiene letra de mas, y las respuestas letras de menos. M eduza es el unico animal que vive en el mar, ademas estas se ven grandemente afectadas por el cambio climatico.',
    porcentaje: 20
  },
  {
    pregunta: '¿Cual de las siguientes palabras tiene mas letras?',
    opciones: ['Mitigacion', 'Millonario'],
    respuestaCorrecta: 'Mitigacion',
    explicacion: 'En mitigacion, repite la letra i tres veces, por lo que tiene 8, ademas , la mitigacion es lo que todas las personas tenemos que buscar para asi contrarestar al cambio climatico',
    porcentaje: 30
  },
    {
    pregunta: 'Cual es la palabra mas larga de esta pregunta que no contiene ninguna de las letras de la palabra "Clima"',
    respuestaCorrecta: 'que',
    explicacion: '"es", "no" no contienen ninguna letra pero "que" es la mas larga.',
    porcentaje: 40
  },
  {
    pregunta: 'Cual de las siguientes palabras no encaja en la siguiente seire:',
    opciones: ['Desolacion', 'Insolar', 'Consolador', 'Invernadero'],
    respuestaCorrecta: 'Invernadero',
    explicacion: 'Invernadero es la unica palabra que no tiene sol dentro de la palabra (poner mas info del sol)',
    porcentaje: 50
  },
  {
    pregunta: '¿Cual de estos compuestos no pertenece a la lista?',
    opciones: ['CO2', 'CH4', 'N20', 'H20'],
    respuestaCorrecta: 'H20',
    explicacion: 'ya que no es un gas de efecto invernadero',
    porcentaje: 60
  },
  // {
  //   pregunta: 'Complete la siguiente serie de numeros: 2020,2023,2027,2032, * , 2044,2051',
  //   respuestaCorrecta: 2038,
  //   explicacion:'Si no se para el cambio climatico para 2038 el mundo va a explotar',
  //   porcentaje: 70
  // },
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
      // Si no tiene opciones, se considera correcta si la respuesta del usuario no está vacía
      const respuestaCorrectaSeleccionada = respuestaUsuario.trim() !== "";
  
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