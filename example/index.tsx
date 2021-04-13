import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled from 'styled-components';
import { AgentApp } from '../.';

const LoginContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0;
`;

const LoggedInHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    margin-left: 10px;
  }
`;

const storedApiKey = window.localStorage.getItem('agent_app_api_key') || '';
const storedAgentEmail = window.localStorage.getItem('agent_app_agent_email') || '';
const isLoggedIn = Boolean(storedApiKey && storedAgentEmail);

const App = () => {
  const [apiKey, setApiKey] = React.useState(storedApiKey);
  const [agentEmail, setAgentEmail] = React.useState(storedAgentEmail);
  const [loggedIn, setLoggedIn] = React.useState(isLoggedIn);
  
  const onApiKeyChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setApiKey(value);
  }, [setApiKey]);

  const onAgentEmailChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setAgentEmail(value);
  }, [setAgentEmail]);

  const onLoginClick = React.useCallback(() => {
    if (apiKey && agentEmail) {
      window.localStorage.setItem('agent_app_api_key', apiKey);
      window.localStorage.setItem('agent_app_agent_email', agentEmail);
      setLoggedIn(true);
    }
  }, [apiKey, agentEmail]);

  const onLogoutClick = React.useCallback(() => {
    window.localStorage.removeItem('agent_app_api_key');
    window.localStorage.removeItem('agent_app_agent_email');
    setLoggedIn(false);
    setApiKey('');
    setAgentEmail('');
  }, [setLoggedIn, setApiKey, setAgentEmail]);

  if (loggedIn) {
    return (
      <div>
        <LoggedInHeader>
          Logged in as: {agentEmail}
          <button onClick={onLogoutClick}>Logout</button>
        </LoggedInHeader>
        <AgentApp
          apiKey={apiKey}
          agentEmail={agentEmail}
          snapcalljsUrl="https://cdn.snapcall.io/js/snapcall-2.0.7-sandbox.min.js"
        />
      </div>
    );
  }

  return (
    <LoginContainer>
      <InputContainer>
        <label htmlFor="apiKey">API Key</label>
        <input id="apiKey" value={apiKey} onChange={onApiKeyChange} />
      </InputContainer>
      <InputContainer>
        <label htmlFor="agentEmail">Agent email</label>
        <input id="agentEmail" value={agentEmail} onChange={onAgentEmailChange} />
      </InputContainer>
      <button type="submit" onClick={onLoginClick}>Login</button>
    </LoginContainer>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
