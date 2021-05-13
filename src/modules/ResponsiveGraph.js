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
        margin={{ top: 10, right: 50, bottom: 30, left: 50 }}
        enablePoints={false}
        enableGridX={true}
        animate={false}
        isInteractive={true}
        enableSlices="x"
        useMesh={true}
        enableArea={true}
        sliceTooltip={({ slice }) => {
            return (
                <div
                    style={{
                        background: 'white',
                        padding: '9px 12px',
                        border: '1px solid #ccc',
                    }}
                >
                    {slice.points.map(point => (
                        <div
                            key={point.id}
                            style={{
                                // color: point.serieColor,
                                padding: '3px 0',
                            }}
                        >
                            <strong>{point.data.yFormatted}</strong>
                        </div>
                    ))}
                    {
                        // x && (
                            // <div>{x.toTimeString()}</div>
                        // )
                    }
                </div>
            )
        }}
    />
);

export default Graph;