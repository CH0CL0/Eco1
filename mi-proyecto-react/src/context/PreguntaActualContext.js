import React from 'react';

export const PreguntaActualContext = React.createContext();

const PreguntaProvider = (props) => {
    const [pregunta, setPregunta] = React.useState(null);

    return <PreguntaActualContext.Provider value={{pregunta, setPregunta}}>{props.children}</PreguntaActualContext.Provider>
}

export default PreguntaProvider;
