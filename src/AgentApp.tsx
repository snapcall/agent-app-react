import * as React from 'react';
import PropTypes from 'prop-types';
import { AgentAppProps, RingingViewProps } from './types';
import defaultWaitingView from './views/waiting';
import defaultRingingView from './views/ringing';
import defaultInCallView from './views/inCall';

declare global {
  interface Window {
    snapcallAPI: any;
  }
}

const loadScript = () => {
  const script = document.createElement('script');
  script.src =
    'https://sandbox.snapcall.io/snap/snapcalljs/snapcalljs-development.js';
  document.body.appendChild(script);
};

const AgentApp = ({
  apiKey,
  agentEmail,
  waitingView: WaitingView,
  ringingView: RingingView,
  inCallView: InCallView,
}: AgentAppProps) => {
  const [agentID, setAgentID] = React.useState<null | string>(null);
  const [view, setView] = React.useState('loading');
  const [ringingData, setRingingData] = React.useState<RingingViewProps>({
    answer: () => {},
    decline: () => {},
    callID: '',
  });
  const [callTimer, setCallTimer] = React.useState(0);

  const onInit = () => {
    window.snapcallAPI.setApiCredentials(apiKey, 'deprecated');
    window.snapcallAPI.agentLogin(agentEmail);
  };

  const onLogin = (event: CustomEvent) => {
    const { success, agentIdentifier } = event.detail.data;
    if (success && agentIdentifier) {
      setAgentID(agentIdentifier);
    }
  };

  const onRinging = (event: CustomEvent) => {
    const { take, refuse, id } = event.detail.data;
    setRingingData({
      answer: take,
      decline: refuse,
      callID: id,
    });
    setView('ringing');
  };

  const onAnswer = () => {
    setView('inCall');
  };

  const onCallCurrentTimer = (event: CustomEvent) => {
    const { time } = event.detail.data;
    setCallTimer(time);
  };

  const onCallEnd = () => {
    setView('waiting');
  };

  React.useEffect(() => {
    if (!apiKey) throw new Error('"apiKey" is a required prop');
    if (!agentEmail) throw new Error('"agentEmail" is a required prop');
    loadScript();
    window.addEventListener('snapcallEvent_init', onInit);
    window.addEventListener('snapcallEvent_login', onLogin as EventListener);
    window.addEventListener(
      'snapcallEvent_ringing',
      onRinging as EventListener
    );
    window.addEventListener('snapcallEvent_callAnswer', onAnswer);
    window.addEventListener(
      'snapcallEvent_callCurrentTimer',
      onCallCurrentTimer as EventListener
    );
    window.addEventListener('snapcallEvent_callEnd', onCallEnd);
    return () => {
      window.removeEventListener('snapcallEvent_init', onInit);
      window.removeEventListener(
        'snapcallEvent_login',
        onLogin as EventListener
      );
      window.removeEventListener(
        'snapcallEvent_ringing',
        onRinging as EventListener
      );
      window.removeEventListener('snapcallEvent_callAnswer', onAnswer);
      window.removeEventListener(
        'snapcallEvent_callCurrentTimer',
        onCallCurrentTimer as EventListener
      );
      window.removeEventListener('snapcallEvent_callEnd', onCallEnd);
    };
  }, []);

  React.useEffect(() => {
    if (agentID) setView('waiting');
  }, [agentID]);

  if (view === 'loading') return <p>Loading..</p>;
  if (view === 'waiting') {
    return (
      <WaitingView
        resetWrapUpTime={window.snapcallAPI.resetWrapUpTime}
        wrapUpTimeLeft={0}
      />
    );
  }
  if (view === 'ringing') {
    return (
      <RingingView
        answer={ringingData.answer}
        decline={window.snapcallAPI.endCall}
        callID={ringingData.callID}
      />
    );
  }
  if (view === 'inCall') {
    return (
      <InCallView
        hangUp={window.snapcallAPI.endCall}
        toggleHold={window.snapcallAPI.clientHold}
        timer={callTimer}
      />
    );
  }
  return null;
};

AgentApp.defaultProps = {
  waitingView: defaultWaitingView,
  ringingView: defaultRingingView,
  inCallView: defaultInCallView,
};

AgentApp.propTypes = {
  apiKey: PropTypes.string.isRequired,
  agentEmail: PropTypes.string.isRequired,
  waitingView: PropTypes.func,
  ringingView: PropTypes.func,
  inCallView: PropTypes.func,
};

export { AgentApp };
