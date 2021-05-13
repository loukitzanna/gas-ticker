/* eslint-disable import/no-anonymous-default-export */
import React, { useContext, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { Button, Clock } from 'grommet';

import { GraphContext } from '../hooks/useGasGraph';
import { Pause, PlayFill } from 'grommet-icons';

const websocketUrl = 'wss://www.gasnow.org/ws';

export default () => {
    const [standardGas, setStandardGas] = useState();
    const [playState, setPlayState] = useState('play');
    const { setGraphData } = useContext(GraphContext);
    const {
        readyState,
    } = useWebSocket(websocketUrl, {
        onMessage: (event) => {
            if (playState === 'pause') {
                return;
            }

            const message = (JSON.parse(event.data)).data;
            const newGas = Math.trunc(message?.gasPrices?.standard / 1000000000);
            if (newGas !== standardGas) {
                setStandardGas(newGas);
                setGraphData({
                    y: newGas,
                    x: new Date(message.timestamp),
                    // x: message.timestamp,
                    timestamp: message.timestamp,
                })
            }
        }
    });

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
      }[readyState];

    const handleTogglePlay = () => {
        if (playState === 'play') {
            setPlayState('pause');
        } else {
            setPlayState('play');
        }
    }

    return (
        <div>
            <Clock type="digital" alignSelf="center" />
            <div>The WebSocket is currently {connectionStatus}</div>
            <div>Current gas is: {standardGas}</div>
            <div>
                <Button
                    onClick={handleTogglePlay}
                    icon={playState === 'play' ? (
                        <Pause />
                        ) : (
                        <PlayFill />
                    )}
                />
            </div>
        </div>
    )
}