import * as React from 'react';
import { ErrorViewProps } from '../types';
import { FlexCard, CenteredTextContainer } from './style';

const ErrorView = ({ error }: ErrorViewProps) => {
  return (
    <FlexCard>
      <CenteredTextContainer>{error}</CenteredTextContainer>
    </FlexCard>
  );
};

export default ErrorView;
