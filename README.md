# SnapCall Agent App React

The SnapCall Agent App is a react component that will help you integrate SnapCall to receive calls.

This component is using the [SnapCall widget API](https://doc.snapcall.io/#widget-api-receive-call-agent-side).

## Installation

```
npm install @snapcall/agent-app-react
```

## Basic usage
```js
import { AgentApp } from '@snapcall/agent-app-react';

const App = () => (
  <AgentApp apiKey="123" agentEmail="sauveur@snapcall.io" />
);
```

## Props

### AgentApp

| Name | Type | Description
| --- | --- | --- |
| `apiKey` | `string` | Your SnapCall API key
| `agentEmail` | `string` | The email of the agent receiving calls
| `snapcalljsUrl` | `?string` | A custom URL for the SnapCall Widget SDK script
| `onDisconnect` | `?() => void` | Event triggered when the agent got disconnected
| `onReconnect` | `?() => void` | Event triggered when the agent got reconnected
| `onClientLostConnection` | `?() => void` | Event triggered when the client lost connection
| `onClientWeakNetwork` | `?() => void` | Event triggered when the client network is weak
| `onAgentMicrophoneDown` | `?() => void` | Event triggered when the agent microphone is down
| `onAgentMicrophoneUp` | `?() => void` | Event triggered when the agent microphone is up
| `loadingView` | `?() => ReactNode` | View used for loading
| `waitingView` | `?({ resetWrapUpTime: Function, wrapUpTimeLeft: number }) => ReactNode` | View used when the agent is waiting for a call (ready)
| `ringingView` | `?({ answer: Function, decline: Function, callID: string }) => ReactNode` | View used when the agent is receiving a call
| `inCallView` | `?({ hangUp: Function, toggleHold: Function, timer: number, Video: ReactNode }) => ReactNode` | View used when the agent is in call

### Video

The **Video** component is available as a props for the `inCallView`.

| Name | Type | Description
| --- | --- | --- |
| `timer` | `?number` | If set, will display the call timer on top of the video element
| `hideControls` | `?boolean` | Whether the control buttons should be displayed or not

## Example

```js
import { AgentApp } from '@snapcall/agent-app-react';

const RingingView = ({ answer, decline, callID }) => (
  <div>
    <p>A call is coming! (ID: {callID})</p>
    <button onClick={answer}>Answer</button>
    <button onClick={decline}>Decline</button>
  </div>
);

const InCallView = ({ hangUp, timer, Video }) => (
  <div>
    <Video timer={timer} />
    <button onClick={hangUp}>Hang up</button>
  </div>
);

const App = () => (
  <AgentApp
    apiKey="123"
    agentEmail="sauveur@snapcall.io"
    ringingView={RingingView}
    inCallView={InCallView}
    onClientLostConnection={() => console.log('The client lost the connection!!')}
  />
);
```
