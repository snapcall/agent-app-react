import * as React from 'react';
import { RingingViewProps } from '../types';
import { Container, ButtonsContainer, Button } from './style';

const Ringing = ({ answer, decline }: RingingViewProps) => {
  return (
    <Container>
      A call is coming!
      <ButtonsContainer>
        <Button onClick={answer} primary>
          Answer
        </Button>
        <Button onClick={decline} danger>
          Decline
        </Button>
      </ButtonsContainer>
    </Container>
  );
};

export default Ringing;
