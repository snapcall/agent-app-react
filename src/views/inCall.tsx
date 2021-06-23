import * as React from 'react';
import { Button } from '@livechat/design-system';
import { InCallViewProps } from '../types';
import { FlexCard, ButtonsContainer } from './style';

const InCall = ({ hangUp, toggleHold, timer, Video }: InCallViewProps) => {
  const [isOnHold, setIsOnHold] = React.useState(false);
  const onHoldClick = () => {
    toggleHold();
    setIsOnHold(current => !current);
  };
  return (
    <FlexCard>
      <Video timer={timer} />
      <ButtonsContainer>
        <Button kind="primary" onClick={onHoldClick}>
          {isOnHold ? 'Resume' : 'Hold'}
        </Button>
        <Button kind="destructive" onClick={hangUp}>
          Hang up
        </Button>
      </ButtonsContainer>
    </FlexCard>
  );
};

export default InCall;
