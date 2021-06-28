import * as React from 'react';
import styled from 'styled-components';
import { Card } from '@livechat/design-system';

export const FlexCard = ({ children }: { children: React.ReactNode }) => (
  <Card
    title=""
    style={{
      width: '400px',
      display: 'flex',
      flexDirection: 'column',
      margin: '0 auto',
    }}
  >
    {children}
  </Card>
);

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;

  button {
    flex: 1;
  }

  button:not(:last-child) {
    margin-right: 20px;
  }
`;

export const LoadingTextContainer = styled.p`
  text-align: center;
`;

export const Separator = styled.div`
  width: 50%;
  border-top: 1px solid #dde2e6;
  margin: 20px auto;
`;
