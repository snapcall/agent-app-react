import * as React from 'react';
import PropTypes from 'prop-types';
import { AgentAppProps, RingingViewProps } from './types';
import defaultLoadingView from './views/loading';
import defaultWaitingView from './views/waiting';
import defaultRingingView from './views/ringing';
import defaultInCallView from './views/inCall';

declare global {
  interface Window {
    snapcallAPI: any;
  }
}

interface AgentStatus {
  inWrapUpTime: boolean;
  wrapUpTimeLeft: number;
}

const loadScript = () => {
  const script = document.createElement('script');
  script.src =
    'https://sandbox.snapcall.io/snap/snapcalljs/snapcalljs-development.js';
  document.body.appendChild(script);
};

let wrapUpTimeLeftInterval: number | null = null;

const AgentApp = ({
  apiKey,
  agentEmail,
  loadingView: LoadingView,
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
  const [wrapUpTimeLeft, setWrapUpTimeLeft] = React.useState(0);

  const updateWrapUpTimeLeft = () => setWrapUpTimeLeft(current => current - 1);

  const checkAgentStatus = () => {
    window.snapcallAPI.getAgentStatus((err: string, agent: AgentStatus) => {
      if (err) console.error(err);
      if (agent?.inWrapUpTime) {
        const wrapUpTimeLeftInSeconds = Math.floor(agent.wrapUpTimeLeft / 1000);
        setWrapUpTimeLeft(wrapUpTimeLeftInSeconds);
      }
      setView('waiting');
    });
  };

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
    setView('loading');
    checkAgentStatus();
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
    if (agentID) checkAgentStatus();
  }, [agentID]);

  React.useEffect(() => {
    if (wrapUpTimeLeft > 0 && !wrapUpTimeLeftInterval) {
      wrapUpTimeLeftInterval = setInterval(updateWrapUpTimeLeft, 1000);
    } else if (wrapUpTimeLeft <= 0) {
      if (wrapUpTimeLeftInterval) clearInterval(wrapUpTimeLeftInterval);
      wrapUpTimeLeftInterval = null;
    }
  }, [wrapUpTimeLeft]);

  if (view === 'loading') return <LoadingView />;
  if (view === 'waiting') {
    return (
      <WaitingView
        resetWrapUpTime={() => {
          setView('loading');
          window.snapcallAPI.resetWrapUpTime((err: string, success: boolean) => {
            if (err) console.error(err);
            if (success) {
              setWrapUpTimeLeft(0);
              setView('waiting');
            }
          });
        }}
        wrapUpTimeLeft={wrapUpTimeLeft}
      />
    );
  }
  if (view === 'ringing') {
    return (
      <RingingView
        answer={() => {
          setView('loading');
          ringingData.answer();
        }}
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
  loadingView: defaultLoadingView,
  waitingView: defaultWaitingView,
  ringingView: defaultRingingView,
  inCallView: defaultInCallView,
};

AgentApp.propTypes = {
  apiKey: PropTypes.string.isRequired,
  agentEmail: PropTypes.string.isRequired,
  loadingView: PropTypes.func,
  waitingView: PropTypes.func,
  ringingView: PropTypes.func,
  inCallView: PropTypes.func,
};

export { AgentApp };
