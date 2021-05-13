import React, { useState, useRef } from 'react';

export const GraphContext = React.createContext()

const GraphWrapper = ({ children }) => {
    const [ data, setData ] = useState([]);
    const lastTimestamp = useRef(''); 
    
    const setGraphData = (newDatum) => {
        console.log(newDatum);
        const temp = [...data];
        temp.push(newDatum);
        lastTimestamp.current = newDatum?.timestamp;
    
        if (data.length > 10) { // keep it low while debugging
            temp.pop();
        }
        setData(temp);
        console.log(temp);
    
        return temp;
    }

    return (
        <GraphContext.Provider
            value={{
                data,
                setGraphData,
            }}
        >
            {children}
        </GraphContext.Provider>
    )
}

export default GraphWrapper;