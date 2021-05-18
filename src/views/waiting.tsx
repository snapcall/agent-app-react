import * as React from 'react';
import '@livechat/design-system/dist/design-system.css';
import { Card, Button } from '@livechat/design-system';
import { WaitingProps } from '../types';
import Video from '../components/video';
import secondsToTime from '../helpers/secondsToTime';

const Waiting = ({ wrapUpTimeLeft, resetWrapUpTime }: WaitingProps) => {
  return (
    <Card
      title=""
      style={{
        width: '400px',
        display: 'flex',
        flexDirection: 'column',
        margin: '0 auto',
      }}
    >
      {wrapUpTimeLeft ? (
        <React.Fragment>
          <span>In wrap up time</span>
          <span>
            You'll get back online in: {secondsToTime(wrapUpTimeLeft)}
          </span>
          <button onClick={resetWrapUpTime}>Go online</button>
        </React.Fragment>
      ) : (
        <>
          <Video />
          <Button kind="secondary" disabled>
            Waiting for a call...
          </Button>
        </>
      )}
    </Card>
  );
};

export default Waiting;
