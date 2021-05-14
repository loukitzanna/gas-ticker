import React, { useContext } from 'react';
import styled from 'styled-components';
import { Box, Stack, Text, RangeSelector } from 'grommet';
import { GraphContext } from '../../hooks/DataLoader';
import ResponsiveLine from './ResponsiveGraph';

const GraphOptions = ({ values, setValues }) => {
    const scale = Array(30).fill('a').map((i, idx) => idx * 10);

    return (
        <Stack>
            <Box direction="row" justify="between">
                {scale.map(value => (
                <Box key={value} pad="small" border={false}>
                    <Text >
                    {value}
                    </Text>
                </Box>
                ))}
            </Box>
            <RangeSelector
                direction="horizontal"
                invert={false}
                min={0}
                max={300}
                size="full"
                round="small"
                values={values}
                onChange={values => setValues(values)}
                step={10}
            />
            </Stack>
    )
}

const GraphContainer = styled.div`
    height: 40vh;
    margin-bottom: 20px;
`;

const Graph = () => {
    const { data } = useContext(GraphContext);
    const [values, setValues] = React.useState([100, 250]);

    return (
        <Box>
            <GraphContainer data={data} >
                <ResponsiveLine
                    data={data}
                    values={values}
                />
            </GraphContainer>
            <GraphOptions values={values} setValues={setValues} />
        </Box>
    )
}

export default Graph;