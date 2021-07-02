import * as React from 'react';
import { Button } from '@livechat/design-system';
import { RingingViewProps } from '../types';
import Video from '../components/video';
import { FlexCard } from './style';

const Ringing = ({ answer }: RingingViewProps) => {
  return (
    <FlexCard>
      <Video hideControls />
      <Button kind="primary" onClick={answer} style={{ marginTop: '20px' }}>
        Answer
      </Button>
    </FlexCard>
  );
};

export default Ringing;
