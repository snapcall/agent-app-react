import * as React from 'react';
import { RingingViewProps } from '../types';
import { Container, ActionButton } from './style';

const Ringing = ({ answer, decline }: RingingViewProps) => {
  return (
    <Container>
      A call is coming! (play music)
      <div>
        <ActionButton onClick={answer}>Answer</ActionButton>
        <ActionButton onClick={decline}>Decline</ActionButton>
      </div>
    </Container>
  );
};

export default Ringing;
