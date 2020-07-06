import * as React from 'react';
import { WaitingProps  } from '../types';
import secondsToTime from '../helpers/secondsToTime';
import { Container } from './style';

const Waiting = ({ wrapUpTimeLeft, resetWrapUpTime }: WaitingProps) => {
  return (
    <Container>
      {wrapUpTimeLeft ? (
        <React.Fragment>
          <span>In wrap up time</span>
          <span>You'll get back online in: {secondsToTime(wrapUpTimeLeft)}</span>
          <button onClick={resetWrapUpTime}>Go online</button>
        </React.Fragment>
      ) : (
        <p>Ready to receive calls</p>
      )}
    </Container>
  );
};

export default Waiting;
