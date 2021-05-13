import React, { useContext } from 'react';
import styled from 'styled-components';
import { ResponsiveLine } from '@nivo/line'
import { GraphContext } from '../hooks/useGasGraph';

const MyResponsiveLine = ({ data }) => (
    <ResponsiveLine
        data={[{
            id: 'gwei',
            data
        }]}
        xScale={{ type: 'time', format: 'native' }}
        yScale={{ type: 'linear' }}
        axisBottom={{
            format: '%H:%M:%S',
            // tickValues: 'every second',
            // legend: `${this.formatTime(dataA[0].x)} ——— ${this.formatTime(last(dataA).x)}`,
            // legendPosition: 'middle',
            // legendOffset: 46,
        }}
        margin={{ top: 20, right: 20, bottom: 60, left: 80 }}
        enablePoints={false}
        enableGridX={true}
        animate={false}
        isInteractive={false}
        enableSlices={false}
        useMesh={true}
    />
);
const GraphContainer = styled.div`
    height: 40vh;
`;

const Graph = () => {
    const { data } = useContext(GraphContext);
    return (
        <div
        >
            <p>Graph to follow</p>

            <GraphContainer data={data} >
                <MyResponsiveLine
                    data={data}
                />
            
            </GraphContainer>
        </div>
    )
}

export default Graph;