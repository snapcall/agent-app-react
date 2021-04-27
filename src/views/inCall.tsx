import * as React from 'react';
import { InCallViewProps } from '../types';
import { Container, VideoContainer, ButtonsContainer, Button } from './style';

const InCall = ({ hangUp, toggleHold, timer, Video }: InCallViewProps) => {
  const [isOnHold, setIsOnHold] = React.useState(false);
  const onHoldClick = () => {
    toggleHold();
    setIsOnHold(current => !current);
  };
  return (
    <Container>
      <VideoContainer>
        <Video timer={timer} />
      </VideoContainer>
      <ButtonsContainer>
        <Button onClick={onHoldClick}>{isOnHold ? 'Resume' : 'Hold'}</Button>
        <Button onClick={hangUp} danger>
          Hang up
        </Button>
      </ButtonsContainer>
    </Container>
  );
};

export default InCall;
