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
    <g transform="translate(8519 -12069.5)">
      <path
        d="M15.359,26.558A2.84,2.84,0,1,0,18.2,29.4,2.848,2.848,0,0,0,15.359,26.558ZM6.84,1a2.84,2.84,0,1,0,2.84,2.84A2.848,2.848,0,0,0,6.84,1Zm0,8.519a2.84,2.84,0,1,0,2.84,2.84A2.848,2.848,0,0,0,6.84,9.519Zm0,8.519a2.84,2.84,0,1,0,2.84,2.84A2.848,2.848,0,0,0,6.84,18.038ZM23.878,6.679a2.84,2.84,0,1,0-2.84-2.84A2.848,2.848,0,0,0,23.878,6.679ZM15.359,18.038a2.84,2.84,0,1,0,2.84,2.84A2.848,2.848,0,0,0,15.359,18.038Zm8.519,0a2.84,2.84,0,1,0,2.84,2.84A2.848,2.848,0,0,0,23.878,18.038Zm0-8.519a2.84,2.84,0,1,0,2.84,2.84A2.848,2.848,0,0,0,23.878,9.519Zm-8.519,0a2.84,2.84,0,1,0,2.84,2.84A2.848,2.848,0,0,0,15.359,9.519Zm0-8.519A2.84,2.84,0,1,0,18.2,3.84,2.848,2.848,0,0,0,15.359,1Z"
        transform="translate(-8496.32 12090.92)"
      />
    </g>
  </PadSVG>
);

export default Pad;
