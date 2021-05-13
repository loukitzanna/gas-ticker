import './App.css';
import { Grommet,
  Main,
  Heading,
  Card,
  CardBody,
} from 'grommet';

import WebSocket from './modules/WebSocket';
import Graph from './modules/Graph';
import GraphContext from './hooks/useGasGraph';

function App() {
  return (
    <div className="App">
      <Grommet plain full>
        <Heading level='3' margin='none'>Gwei Gas Prices Ticker</Heading>
        <Main 
          pad="large" 
          background={{
            "color": "light-4",
            // "dark": true,
            "opacity": true,
          }}
        >
          <GraphContext>
            <Card pad="medium" background="light-1">
              <CardBody>
                <WebSocket />
                <Graph />
              </CardBody>
            </Card>
          </GraphContext>
        </Main>
      </Grommet>
    </div>
  );
}

export default App;
