import * as React from 'react';
import PropTypes from 'prop-types';
import { VideoProps } from '../../types';
import secondsToTime from '../../helpers/secondsToTime';
import CameraIcon from './icons/Camera';
import CameraFlipIcon from './icons/CameraFlip';
import ScreenShareIcon from './icons/ScreenShare';
import PictureInPictureIcon from './icons/PictureInPicture';
import MicrophoneIcon from './icons/Microphone';
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
  const [displayCameraFlip, setDisplayCameraFlip] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);

  const onMicrophoneClick = () => {
    const muted = window.snapcallAPI.toggleMute();
    setIsMuted(muted);
  };

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

  const onWebcamFlipClick = () => {
    window.snapcallAPI.switchCamera(localWebcamRef.current);
  };

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

  const onLeavePictureInPicture = () => {
    window.snapcallAPI.displayRemoteVideo(remoteVideoRef.current);
    remoteVideoRef.current?.removeEventListener(
      'leavepictureinpicture',
      onLeavePictureInPicture
    );
  };

  const onPictureInPictureClick = () => {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture?.();
    } else {
      remoteVideoRef.current?.requestPictureInPicture();
      remoteVideoRef.current?.addEventListener(
        'leavepictureinpicture',
        onLeavePictureInPicture
      );
    }
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

  const checkCamerasList = async () => {
    try {
      const camerasList = await window.snapcallAPI.getCamerasList();
      const shouldDisplayCameraFlip = camerasList.length > 1;
      setDisplayCameraFlip(shouldDisplayCameraFlip);
    } catch (getCamerasListError) {
      console.warn(getCamerasListError);
      setDisplayCameraFlip(false);
    }
  };

  React.useEffect(() => {
    checkCamerasList();
    window.addEventListener('snapcallEvent_mediaRequest', checkCamerasList);
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
        'snapcallEvent_mediaRequest',
        checkCamerasList
      );
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
                  <VideoButton onClick={onScreenShareClick}>
                    <span>
                      <ScreenShareIcon slash={!isScreenSharing} />
                    </span>
                  </VideoButton>
                  <VideoButton onClick={onMicrophoneClick}>
                    <span>
                      <MicrophoneIcon slash={isMuted} />
                    </span>
                  </VideoButton>
                  <VideoButton onClick={onWebcamClick}>
                    <span>
                      <CameraIcon slash={!isShowingWebcam} />
                    </span>
                  </VideoButton>
                  {displayCameraFlip && isShowingWebcam && (
                    <VideoButton onClick={onWebcamFlipClick}>
                      <span>
                        <CameraFlipIcon />
                      </span>
                    </VideoButton>
                  )}
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
