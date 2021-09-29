export interface AgentAppProps {
  apiKey: string;
  agentEmail: string;
  snapcalljsUrl?: string;
  onDisconnect?: () => void;
  onReconnect?: () => void;
  onClientLostConnection?: () => void;
  onClientWeakNetwork?: () => void;
  onAgentMicrophoneDown?: () => void;
  onAgentMicrophoneUp?: () => void;
  loadingView: React.ComponentType;
  waitingView: React.ComponentType<WaitingProps>;
  ringingView: React.ComponentType<RingingViewProps>;
  inCallView: React.ComponentType<InCallViewProps>;
}

export interface VideoProps {
  timer?: number | null;
  hideControls?: boolean;
}

export interface WaitingProps {
  resetWrapUpTime: () => void;
  wrapUpTimeLeft: number;
  startOutboundCall: ({ phoneNumber }: { phoneNumber: string }) => void;
  VideoPreview: React.ComponentType;
}

export interface RingingViewProps {
  answer: () => void;
  decline: () => void;
  callID: string;
  VideoPreview: React.ComponentType;
}

export interface InCallViewProps {
  hangUp: () => void;
  toggleHold: () => void;
  timer: number;
  Video: React.ComponentType<VideoProps>;
}

declare global {
  interface Document {
    pictureInPictureEnabled: boolean;
  }

  interface HTMLVideoElement {
    requestPictureInPicture: () => void;
  }
}
