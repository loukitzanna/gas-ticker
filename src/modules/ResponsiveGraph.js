import React from 'react';
import { ResponsiveLine } from '@nivo/line'

const Graph = ({ data, values }) => (
    <ResponsiveLine
        data={[{
            id: 'gwei',
            data
        }]}
        xScale={{ type: 'time', format: 'native' }}
        yScale={{ type: 'linear', min: values[0], max: values[1] }}
        axisBottom={{
            format: '%H:%M:%S',
            tickValues: 'every minute',
        }}
        axisRight={{}}
        margin={{ top: 30, right: 50, bottom: 60, left: 50 }}
        enablePoints={false}
        enableGridX={true}
        animate={false}
        isInteractive={false}
        enableSlices={false}
        useMesh={true}
    />
);

export default Graph;