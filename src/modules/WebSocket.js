/* eslint-disable import/no-anonymous-default-export */
import React, { useContext, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { Button, Clock, Box } from 'grommet';

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

    // const connectionStatus = {
    //     [ReadyState.CONNECTING]: 'Connecting',
    //     [ReadyState.OPEN]: 'Open',
    //     [ReadyState.CLOSING]: 'Closing',
    //     [ReadyState.CLOSED]: 'Closed',
    //     [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    //   }[readyState];

    const handleTogglePlay = () => {
        if (playState === 'play') {
            setPlayState('pause');
        } else {
            setPlayState('play');
        }
    }

    return (
        <div>
            <Clock type="digital" alignSelf="center" hourLimit="12" />
            <Box direction="row" align="center" justify="center">
                <div>
                    <Button
                        onClick={handleTogglePlay}
                        icon={playState === 'play' ? (
                            <Pause />
                            ) : (
                            <PlayFill />
                            )
                        }
                    />
                </div>
                <div>Current gas is: {standardGas}</div>

            </Box>
        </div>
    )
}