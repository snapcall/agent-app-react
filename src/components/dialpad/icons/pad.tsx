import * as React from 'react';
import styled from 'styled-components';

const PadSVG = styled.svg<{ active: boolean }>`
  background-color: ${props => (props.active ? '#434E58' : '#f2f2f2')};
  border-radius: 25px;

  &:hover {
    background-color: ${props => (props.active ? '#434E58' : '#dadada')};
  }

  path {
    fill: ${props => (props.active ? '#fff' : '#707070')};
  }
`;

const Pad = ({ active }: { active: boolean }) => (
  <PadSVG
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 77 77"
    active={active}
  >
    <path d="M38.039 47.978a2.84 2.84 0 1 0 2.841 2.842 2.848 2.848 0 0 0-2.841-2.842ZM29.52 22.42a2.84 2.84 0 1 0 2.84 2.84 2.848 2.848 0 0 0-2.84-2.84Zm0 8.519a2.84 2.84 0 1 0 2.84 2.84 2.848 2.848 0 0 0-2.84-2.84Zm0 8.519a2.84 2.84 0 1 0 2.84 2.84 2.848 2.848 0 0 0-2.84-2.84Zm17.038-11.359a2.84 2.84 0 1 0-2.84-2.84 2.848 2.848 0 0 0 2.84 2.84Zm-8.519 11.359a2.84 2.84 0 1 0 2.84 2.84 2.848 2.848 0 0 0-2.84-2.84Zm8.519 0a2.84 2.84 0 1 0 2.84 2.84 2.848 2.848 0 0 0-2.84-2.84Zm0-8.519a2.84 2.84 0 1 0 2.84 2.84 2.848 2.848 0 0 0-2.84-2.84Zm-8.519 0a2.84 2.84 0 1 0 2.84 2.84 2.848 2.848 0 0 0-2.84-2.84Zm0-8.519a2.84 2.84 0 1 0 2.841 2.84 2.848 2.848 0 0 0-2.841-2.84Z" />
  </PadSVG>
);

export default Pad;
