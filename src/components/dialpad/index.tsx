import * as React from 'react';
import { Button } from '@livechat/design-system';
import PadIcon from './icons/pad';
import {
  DialpadContainer,
  DialpadButton,
  DialpadMenu,
  InputContainer,
  DialpadInput,
} from './style';

interface DialpadProps {
  startOutboundCall: ({ phoneNumber }: { phoneNumber: string }) => void;
}

const Dialpad = ({ startOutboundCall }: DialpadProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = React.useState('');

  const toggleIsOpen = () => setIsOpen(current => !current);

  const onCallClick = () => {
    startOutboundCall({ phoneNumber });
  };

  return (
    <DialpadContainer>
      <DialpadButton onClick={toggleIsOpen}>
        <PadIcon active={isOpen} />
      </DialpadButton>
      {isOpen && (
        <DialpadMenu>
          <InputContainer>
            <DialpadInput
              placeholder="Enter a phone number"
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
            />
          </InputContainer>
          <Button kind="primary" onClick={onCallClick}>
            Call
          </Button>
        </DialpadMenu>
      )}
    </DialpadContainer>
  );
};

export default Dialpad;
