import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Inicio from './components/Inicio';
import Juego from './components/Juego';
import ExplicacionPregunta from './components/Explicacion'
import PreguntaProvider from './context/PreguntaActualContext'
function App() {
  return (
    <PreguntaProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/juego" element={<Juego />} />
          <Route path="/explicacion" element={<ExplicacionPregunta />} />
        </Routes>
      </BrowserRouter>
    </PreguntaProvider>
  );
}

export default App;