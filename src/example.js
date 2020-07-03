const SnapCallAgentApp = null;

const App = () => {
  return (
    <SnapCallAgentApp
      apiKey="123"
      agentEmail="julien@snapcall.io"
      onDisconnect={}
      onReconnect={}
      onMicrophoneNotConnected={}
      onWeakClientNetwork={}
      loadingView={() => <p>Loading...</p>}
      ringingView={({ answer, decline, callID }) => (
        <div>
          <p>A call is coming! ({callID})</p>
          <button onClick={answer}>Answer</button>
          <button onClick={decline}>Decline</button>
        </div>
      )}
      inCallView={({ toggleHold, timer }) => {
        const [onHold, setOnHold] = useState(false);
        const onHoldButtonClick = () => {
          toggleHold();
          setOnHold(current => !current);
        };
        return (
          <div>
            <p>Call duration in seconds: {timer}</p>
            <button onClick={onHoldButtonClick}>
              {onHold ? 'Resume' : 'Hold'}
            </button>
          </div>
        );
      }}
      onWaitingView={({ wrapUpTimeLeft, resetWrapUpTime }) => (
        <div>
          <p>Wrap up time left in seconds: {wrapUpTimeLeft}</p>
          <button onClick={resetWrapUpTime}>Go online</button>
        </div>
      )}
    />
  );
};
