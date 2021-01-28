import * as React from 'react';
import PropTypes from 'prop-types';
import { AgentAppProps, RingingViewProps } from './types';
import defaultLoadingView from './views/loading';
import defaultWaitingView from './views/waiting';
import defaultRingingView from './views/ringing';
import defaultInCallView from './views/inCall';
import {
  checkMicrophoneLevel,
  endMicrophoneLevelCheck,
} from './helpers/microphoneLevelCheck';

declare global {
  interface Window {
    snapcallAPI: any;
  }
}

interface AgentStatus {
  inWrapUpTime: boolean;
  wrapUpTimeLeft: number;
}

const loadScript = (url: string) => {
  const script = document.createElement('script');
  script.src = url;
  document.body.appendChild(script);
};

let wrapUpTimeLeftInterval: number | null = null;

const AgentApp = ({
  apiKey,
  agentEmail,
  snapcalljsUrl = 'https://snap.snapcall.io/snapapp.min.js',
  onDisconnect,
  onReconnect,
  onClientLostConnection,
  onClientWeakNetwork,
  onAgentMicrophoneDown,
  onAgentMicrophoneUp,
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
      setView((currentView) => {
        if (currentView === 'ringing') return 'ringing';
        return 'waiting';
      });
    });
  };

  const clientNetworkCheck = (event: CustomEvent) => {
    const { secsSinceMedia, deadAudio, from, rtt } = event.detail.data;
    const shouldNotify = secsSinceMedia % 5 === 0;
    if (deadAudio && (shouldNotify || secsSinceMedia === 1)) {
      /**
       * Case no.1: deadAudio is sent when no audio packets are received
       * Then we can assume the connection has been lost.
       */
      if (onClientLostConnection) onClientLostConnection();
    } else if (rtt || from) {
      /**
       * Case no.2: handles bad network quality from the customer side.
       * I tried with several use cases
       *  - Very bad connection:
       *    We only received the rtt value which usually is above 1000
       *  - 3G and Edge:
       *    We received this object: { "from": { lossRate: 0.5 }, "rtt": 1000 }
       */
      if (onClientWeakNetwork) onClientWeakNetwork();
    }
  };

  const onDisconnectEvent = () => {
    if (onDisconnect) onDisconnect();
  };

  const onReconnectEvent = () => {
    if (onReconnect) onReconnect();
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
    checkMicrophoneLevel({
      onMicrophoneDown: onAgentMicrophoneDown,
      onMicrophoneUp: onAgentMicrophoneUp,
    });
  };

  const onCallCurrentTimer = (event: CustomEvent) => {
    const { time } = event.detail.data;
    setCallTimer(time);
  };

  const onCallEnd = () => {
    setView('loading');
    checkAgentStatus();
    endMicrophoneLevelCheck();
  };

  React.useEffect(() => {
    if (!apiKey) throw new Error('"apiKey" is a required prop');
    if (!agentEmail) throw new Error('"agentEmail" is a required prop');
    loadScript(snapcalljsUrl);
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
    window.addEventListener('snapcallEvent_callDisconnect', onDisconnectEvent);
    window.addEventListener('snapcallEvent_callReconnect', onReconnectEvent);
    window.addEventListener(
      'snapcallEvent_receiveInfo',
      clientNetworkCheck as EventListener
    );
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
      window.removeEventListener(
        'snapcallEvent_callDisconnect',
        onDisconnectEvent
      );
      window.removeEventListener(
        'snapcallEvent_callReconnect',
        onReconnectEvent
      );
      window.removeEventListener(
        'snapcallEvent_receiveInfo',
        clientNetworkCheck as EventListener
      );
    };
  }, []);

  React.useEffect(() => {
    if (agentID) checkAgentStatus();
  }, [agentID]);

  React.useEffect(() => {
    if (wrapUpTimeLeft > 0 && !wrapUpTimeLeftInterval) {
      wrapUpTimeLeftInterval = window.setInterval(updateWrapUpTimeLeft, 1000);
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
          window.snapcallAPI.resetWrapUpTime(
            (err: string, success: boolean) => {
              if (err) console.error(err);
              if (success) {
                setWrapUpTimeLeft(0);
                setView('waiting');
              }
            }
          );
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
  onDisconnect: null,
  onReconnect: null,
  onClientLostConnection: null,
  onClientWeakNetwork: null,
  onAgentMicrophoneDown: null,
  onAgentMicrophoneUp: null,
  loadingView: defaultLoadingView,
  waitingView: defaultWaitingView,
  ringingView: defaultRingingView,
  inCallView: defaultInCallView,
};

AgentApp.propTypes = {
  apiKey: PropTypes.string.isRequired,
  agentEmail: PropTypes.string.isRequired,
  onDisconnect: PropTypes.func,
  onReconnect: PropTypes.func,
  onClientLostConnection: PropTypes.func,
  onClientWeakNetwork: PropTypes.func,
  onAgentMicrophoneDown: PropTypes.func,
  onAgentMicrophoneUp: PropTypes.func,
  loadingView: PropTypes.func,
  waitingView: PropTypes.func,
  ringingView: PropTypes.func,
  inCallView: PropTypes.func,
};

export { AgentApp };
