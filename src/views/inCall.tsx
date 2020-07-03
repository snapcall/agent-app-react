import * as React from 'react';
import { InCallViewProps } from '../types';

const InCall = ({ hangUp, toggleHold, timer }: InCallViewProps) => {
  const [isOnHold, setIsOnHold] = React.useState(false);
  const onHoldClick = () => {
    toggleHold();
    setIsOnHold(current => !current);
  };
  return (
    <div>
      In call ({timer})
      <button onClick={onHoldClick}>{isOnHold ? 'Resume' : 'Hold'}</button>
      <button onClick={hangUp}>Hang up</button>
    </div>
  );
};

export default InCall;
