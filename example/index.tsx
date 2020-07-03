import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AgentApp } from '../.';

const App = () => {
  return (
    <div>
      <AgentApp apiKey="b0ad835fde5411e78d0d0ae03a1ae33f" agentEmail="julien@snapcall.io" />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
