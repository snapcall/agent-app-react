import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  font-family: Source Sans Pro, -apple-system, BlinkMacSystemFont, Segoe UI,
    Helvetica Neue, Arial, sans-serif;
  width: 400px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px;
  width: 100%;

  button {
    flex: 1;
  }

  button:not(:last-child) {
    margin-right: 20px;
  }
`;

export const Button = styled.button`
  user-select: none;
  text-decoration: none;
  font-size: 15px;
  min-width: 36px;
  min-height: 36px;
  transition-property: opacity, border, color, background-color, box-shadow;
  transition-duration: 0.2s;
  transition-timing-function: cubic-bezier(0.64, 0, 0.35, 1);
  border: 1px solid #4384f5;
  text-align: center;
  cursor: pointer;
  border-radius: 4px;
  font-weight: 600;
  display: inline-flex;
  line-height: 1.5;
  position: relative;
  padding: 6px 16px;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;

  ${({ primary, danger }: { primary?: boolean; danger?: boolean }) => {
    const primaryColors = `
      background-color: #4384f5;
      color: #fff;
      border-color: #4384f5;
      &:hover {
        background-color: #4379d6;
      }
    `;
    if (primary) return primaryColors;
    if (danger)
      return `
      background-color: #d64646;
      color: #fff;
      border-color: #d64646;
      &:hover {
        background-color: #b9484a;
      }
    `;
    return primaryColors;
  }}
`;

export const VideoContainer = styled.div`
  width: 100%;
`;
