import './App.css';
import { Grommet,
  Main,
  Heading,
} from 'grommet';

import WebSocket from './modules/WebSocket';
import Graph from './modules/Graph';
import GraphContext, { initialData } from './hooks/useGasGraph';
import { useContext } from 'react';

function App() {
  const value = useContext(GraphContext);
  return (
    <div className="App">
      <Grommet plain full>
        <Heading level='3' margin='none'>Gwei Gas Prices Ticker</Heading>
        <Main pad="large">
          <GraphContext>
            <WebSocket />
            <Graph />
          </GraphContext>
        </Main>
      </Grommet>
    </div>
  );
}

export default App;
