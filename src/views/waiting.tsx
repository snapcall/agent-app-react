import * as React from 'react';
import '@livechat/design-system/dist/design-system.css';
import { Button } from '@livechat/design-system';
import { WaitingProps } from '../types';
import Video from '../components/video';
import Dialpad from '../components/dialpad';
import secondsToTime from '../helpers/secondsToTime';
import { FlexCard, Separator } from './style';

const Waiting = ({
  wrapUpTimeLeft,
  resetWrapUpTime,
  startOutboundCall,
}: WaitingProps) => {
  return (
    <FlexCard>
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
          <Video hideControls />
          <Button kind="secondary" style={{ marginTop: '20px' }} disabled>
            Waiting for a call...
          </Button>
          <Separator />
          <Dialpad startOutboundCall={startOutboundCall} />
        </>
      )}
    </FlexCard>
  );
};

export default Waiting;
