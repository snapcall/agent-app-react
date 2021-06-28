import styled from 'styled-components';

export const VideoWrapper = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  width: 100%;
  margin-bottom: 20px;
`;

export const VideoContainer = styled.div<{ idle: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f2f2f2;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 5;
  margin: auto;
  cursor: ${props => (props.idle ? 'none' : 'default')};
`;

export const VideoElement = styled.video<{ visible: boolean }>`
  position: absolute;
  width: inherit;
  height: inherit;
  border-radius: inherit;
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
`;

export const VideoMirrorElement = styled.video<{ visible: boolean }>`
  position: absolute;
  max-width: 100px;
  max-height: 56px;
  top: 0;
  right: 0;
  border-radius: inherit;
  z-index: 10;
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
`;

export const VideoText = styled.p`
  display: flex;
  align-items: flex-end;
  flex: 1;
  color: #cccccc;
  font-weight: bold;
`;

export const VideoButtonsContainer = styled.div<{ visible: boolean }>`
  display: flex;
  align-items: flex-end;
  flex: 1;
  opacity: ${props => (props.visible ? 1 : 0)};
  margin-bottom: 10px;
  z-index: 15;
  width: 100%;
  transition: opacity 0.1s cubic-bezier(0.4, 0, 1, 1);
`;

export const FixedContainer = styled.div`
  display: flex;
  width: 100%;
  height: 28px;
  margin: 0 10px;
`;

export const VideoButton = styled.button`
  width: 28px;
  height: 28px;
  background-color: rgb(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  border: none;
  border-radius: 50%;
  color: white;

  span {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const LeftButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex: 1;

  ${VideoButton}:not(:first-child) {
    margin-left: 10px;
  }
`;

export const RightButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;

  ${VideoButton} {
    margin-left: 10px;
  }
`;

export const TimerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  font-size: 12px;
  background-color: rgb(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  border-radius: 25px;
  color: white;
`;
