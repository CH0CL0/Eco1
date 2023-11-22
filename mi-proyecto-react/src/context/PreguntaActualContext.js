    import React from 'react';

    export const PreguntaActualContext = React.createContext();

    const PreguntaProvider = (props) => {
        const [pregunta, setPregunta] = React.useState(JSON.parse(localStorage.getItem("pregunta"))||null);

        return <PreguntaActualContext.Provider value={{pregunta, setPregunta}}>{props.children}</PreguntaActualContext.Provider>
    }

    export default PreguntaProvider;
