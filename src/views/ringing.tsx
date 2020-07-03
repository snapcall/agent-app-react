import * as React from 'react';
import { RingingViewProps } from '../types';

const Ringing = ({ answer, decline }: RingingViewProps) => {
  return (
    <div>
      A call is coming! (play music)
      <button onClick={answer}>Answer</button>
      <button onClick={decline}>Decline</button>
    </div>
  );
};

export default Ringing;
