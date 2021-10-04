import styled from 'styled-components';

export const DialpadContainer = styled.div`
  text-align: center;
`;

export const DialpadButton = styled.button`
  background-color: unset;
  border: none;
  cursor: pointer;
  padding: 0;
`;

export const DialpadMenu = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InputContainer = styled.div`
  border: 1px solid #dde2e6;
  border-radius: 8px;
  margin: 20px 0;
  padding: 20px;
`;

export const DialpadInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  height: 35px;
  text-align: center;
  background-color: #f5f6f6;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  color: #424d57;
`;
