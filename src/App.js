import './App.css';
import { Grommet,
  Main,
  Heading,
  Header,
  Card,
  CardBody,
} from 'grommet';

import WebSocket from './modules/Gas/WebSocket';
// import EthSocket from './modules/Eth/EthSocket';
import EthGraph from './modules/Eth/EthPrice';
import Graph from './modules/Gas/Graph';
import GraphContext from './hooks/DataLoader';

function App() {
  return (
    <div className="App">
      <Grommet plain full>
        <Header background={{ color: "neutral-3", dark: 'true' }}>
          <Heading level="3" margin='small'>Gwei Gas Prices Ticker</Heading>
        </Header>
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
            <Card pad="medium" background="light-1">
              <CardBody>
                {/* <EthSocket /> */}
                <EthGraph />
              </CardBody>
            </Card>
          </GraphContext>
        </Main>
      </Grommet>
    </div>
  );
}

export default App;
