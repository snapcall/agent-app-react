import * as React from 'react';
import { InCallViewProps } from '../types';
import secondsToTime from '../helpers/secondsToTime';
import { Container, ActionButton } from './style';

const InCall = ({ hangUp, toggleHold, timer }: InCallViewProps) => {
  const [isOnHold, setIsOnHold] = React.useState(false);
  const onHoldClick = () => {
    toggleHold();
    setIsOnHold(current => !current);
  };
  return (
    <Container>
      In call ({secondsToTime(timer)})
      <div>
        <ActionButton onClick={onHoldClick}>
          {isOnHold ? 'Resume' : 'Hold'}
        </ActionButton>
        <ActionButton onClick={hangUp}>Hang up</ActionButton>
      </div>
    </Container>
  );
};

export default InCall;
