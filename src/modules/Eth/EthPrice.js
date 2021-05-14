import React, { useEffect, useState } from 'react';
import { Button, Box } from 'grommet';
import { Pause, PlayFill } from 'grommet-icons';

// const fetchHistoricEthPrices = async () => {
//     // a reasonable amount of time...
//     const today = new Date();
//     const monthAgo = sub(today, { months: 1 });

//     const endDate = format(today, "yyyy-MM-dd");
//     const startDate = format(monthAgo, "yyyy-MM-dd");

//     console.log(process.env);
//     if (process.env.REACT_APP_ETHERSCAN_API_KEY) {
//         console.log('🎂🎂', process.env.REACT_APP_ETHERSCAN_API_KEY);
//         try {
//             let response = await fetch(`https://api.etherscan.io/api?module=stats&action=ethdailyprice&startdate=${startDate}&enddate=${endDate}&sort=asc&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`);
//             console.log("got a response");
//             // response = response.json();
//             console.log(response);
//             return response;
//         } catch(err) {
//             console.log(err);
//         }
//     }

// }

const fetchCurrentEthPrice = async (setData) => {
    console.log(process.env);
    if (process.env.REACT_APP_ETHERSCAN_API_KEY) {
        console.log('🎂🎂', process.env.REACT_APP_ETHERSCAN_API_KEY);
        try {
            let response = await fetch(`https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`);
            response = await response.json();
            setData(Number(response.result.ethusd))
            return response;
        } catch(err) {
            console.log(err);
        }
    }

}

const Graph = () => {
    const [data, setData] = useState(0);
    const [playState, setPlayState] = useState('play');

    useEffect(() => {
        fetchCurrentEthPrice(setData);
        // while(playState === 'play') {
        //     setTimeout(() => {
        //     }, 10000)
        // }
        // fetchHistoricEthPrices();
    }, [])

    const handleTogglePlay = () => {
        if (playState === 'play') {
            setPlayState('pause');
        } else {
            setPlayState('play');
        }
    }

    return (
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
        <div>Current ETH price is: {data.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}</div>

    </Box>
    )

}

export default Graph;