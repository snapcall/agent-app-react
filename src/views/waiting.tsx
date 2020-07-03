import * as React from 'react';
import { WaitingProps  } from '../types';

const Waiting = ({ wrapUpTimeLeft, resetWrapUpTime }: WaitingProps) => {
  return (
    <div>
      {wrapUpTimeLeft ? (
        <React.Fragment>
          <p>In wrap up time</p>
          <p>You'll get back online in: {wrapUpTimeLeft}</p>
          <button onClick={resetWrapUpTime}>Go online</button>
        </React.Fragment>
      ) : (
        <p>Ready to receive calls</p>
      )}
    </div>
  );
};

export default Waiting;
