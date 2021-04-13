import * as React from 'react';
import PropTypes from 'prop-types';
import { VideoProps } from '../../types';
import secondsToTime from '../../helpers/secondsToTime';
import CameraIcon from './icons/Camera';
import ScreenShareIcon from './icons/ScreenShare';
import PictureInPictureIcon from './icons/PictureInPicture';
import {
  VideoWrapper,
  VideoContainer,
  VideoElement,
  VideoMirrorElement,
  VideoText,
  VideoButtonsContainer,
  FixedContainer,
  LeftButtonsContainer,
  RightButtonsContainer,
  VideoButton,
  TimerContainer,
} from './style';

const Video = ({ timer, hideControls }: VideoProps) => {
  const localWebcamRef = React.useRef<HTMLVideoElement>(null);
  const remoteVideoRef = React.useRef<HTMLVideoElement>(null);
  const videoButtonsTimeout = React.useRef<number>();
  const [isScreenSharing, setIsScreenSharing] = React.useState(false);
  const [isShowingWebcam, setIsShowingWebcam] = React.useState(false);
  const [isReceivingRemoteStream, setIsReceivingRemoteStream] = React.useState(
    false
  );
  const [isIdle, setIsIdle] = React.useState(false);

  const onWebcamClick = React.useCallback(() => {
    if (isShowingWebcam) {
      window.snapcallAPI.stopVideoStream();
      setIsShowingWebcam(false);
    } else {
      window.snapcallAPI.requestLocalVideo(localWebcamRef.current).then(() => {
        window.snapcallAPI.startWebcamStreaming();
        setIsScreenSharing(false);
        setIsShowingWebcam(true);
      });
    }
  }, [isShowingWebcam]);

  const onScreenShareClick = React.useCallback(() => {
    if (isScreenSharing) {
      window.snapcallAPI.stopVideoStream();
      setIsScreenSharing(false);
    } else {
      window.snapcallAPI.startScreenShare().then(() => {
        setIsShowingWebcam(false);
        setIsScreenSharing(true);
      });
    }
  }, [isScreenSharing]);

  const onPictureInPictureClick = () => {
    remoteVideoRef.current?.requestPictureInPicture();
  };

  const onRemoteStream = () => {
    setIsReceivingRemoteStream(true);
  };

  const onRemoteStreamEnd = () => {
    setIsReceivingRemoteStream(false);
    setIsIdle(false);
  };

  const onMouseMove = () => {
    if (!isReceivingRemoteStream) return;
    if (videoButtonsTimeout.current) clearTimeout(videoButtonsTimeout.current);
    setIsIdle(false);
    videoButtonsTimeout.current = window.setTimeout(() => {
      setIsIdle(true);
    }, 2000);
  };

  const onMouseLeave = () => {
    if (!isReceivingRemoteStream) return;
    if (videoButtonsTimeout.current) clearTimeout(videoButtonsTimeout.current);
    setIsIdle(true);
  };

  React.useEffect(() => {
    window.addEventListener('snapcallEvent_onWebcamStream', onRemoteStream);
    window.addEventListener(
      'snapcallEvent_onScreenSharingStream',
      onRemoteStream
    );
    window.addEventListener(
      'snapcallEvent_onWebcamStreamStop',
      onRemoteStreamEnd
    );
    window.addEventListener(
      'snapcallEvent_onScreenSharingStreamStop',
      onRemoteStreamEnd
    );
    window.snapcallAPI.displayRemoteVideo(remoteVideoRef.current);
    return () => {
      window.removeEventListener(
        'snapcallEvent_onWebcamStream',
        onRemoteStream
      );
      window.removeEventListener(
        'snapcallEvent_onScreenSharingStream',
        onRemoteStream
      );
      window.removeEventListener(
        'snapcallEvent_onWebcamStreamStop',
        onRemoteStreamEnd
      );
      window.removeEventListener(
        'snapcallEvent_onScreenSharingStreamStop',
        onRemoteStreamEnd
      );
      window.snapcallAPI.stopVideoStream();
    };
  }, []);

  return (
    <VideoWrapper>
      <VideoContainer
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        idle={isIdle}
      >
        <VideoMirrorElement ref={localWebcamRef} visible={isShowingWebcam} />
        <VideoElement ref={remoteVideoRef} visible={isReceivingRemoteStream} />
        <VideoText>Enable video or screen sharing</VideoText>
        <VideoButtonsContainer visible={!isIdle}>
          <FixedContainer>
            <LeftButtonsContainer>
              {!hideControls && (
                <>
                  <VideoButton onClick={onWebcamClick}>
                    <span>
                      <CameraIcon slash={!isShowingWebcam} />
                    </span>
                  </VideoButton>
                  <VideoButton onClick={onScreenShareClick}>
                    <span>
                      <ScreenShareIcon slash={!isScreenSharing} />
                    </span>
                  </VideoButton>
                </>
              )}
            </LeftButtonsContainer>
            <RightButtonsContainer>
              {timer !== null && (
                <TimerContainer>{secondsToTime(timer || 0)}</TimerContainer>
              )}
              {isReceivingRemoteStream &&
                document.pictureInPictureEnabled &&
                !hideControls && (
                  <VideoButton onClick={onPictureInPictureClick}>
                    <span>
                      <PictureInPictureIcon />
                    </span>
                  </VideoButton>
                )}
            </RightButtonsContainer>
          </FixedContainer>
        </VideoButtonsContainer>
      </VideoContainer>
    </VideoWrapper>
  );
};

Video.defaultProps = {
  timer: null,
  hideControls: false,
};

Video.propTypes = {
  timer: PropTypes.number,
  hideControls: PropTypes.bool,
};

export default Video;
