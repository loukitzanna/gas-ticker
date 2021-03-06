/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { Button, Clock, Box } from 'grommet';
import { Pause, PlayFill } from 'grommet-icons';

// const websocketUrl = 'wss://stream.binance.com:9443/ws/!miniTicker@arr';
const websocketUrl = 'wss://ws-feed.gdax.com';

export default () => {
    const [ethPrice, setEthPrice] = useState();
    const [playState, setPlayState] = useState('play');
    // const { setGraphData } = useContext(GraphContext);
    
    useWebSocket(websocketUrl, {
        onMessage: (event) => {
            if (playState === 'pause') {
                return;
            }

            const message = (JSON.parse(event.data)).data;

            console.log(message);
            const newGas = Math.trunc(message?.gasPrices?.standard / 1000000000);
            if (newGas !== ethPrice) {
                setEthPrice(newGas);
                // setGraphData({
                //     y: newGas,
                //     x: new Date(message.timestamp),
                //     // x: message.timestamp,
                //     timestamp: message.timestamp,
                // })
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
                <div>Current ETH Price is: {ethPrice}</div>

            </Box>
        </div>
    )
}