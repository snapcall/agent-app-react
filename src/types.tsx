export interface AgentAppProps {
  apiKey: string;
  agentEmail: string;
  loadingView: React.ComponentType;
  waitingView: React.ComponentType<WaitingProps>;
  ringingView: React.ComponentType<RingingViewProps>;
  inCallView: React.ComponentType<InCallViewProps>;
}

export interface WaitingProps {
  resetWrapUpTime: () => void;
  wrapUpTimeLeft: number;
}

export interface RingingViewProps {
  answer: () => void;
  decline: () => void;
  callID: string;
}

export interface InCallViewProps {
  hangUp: () => void;
  toggleHold: () => void;
  timer: number;
}
