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
    
        if (data.length > 500) {
            temp.pop();
        }
        setData(temp);
    
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