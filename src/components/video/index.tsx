import * as React from 'react';
import PropTypes from 'prop-types';
import { VideoProps } from '../../types';
import secondsToTime from '../../helpers/secondsToTime';
import CameraIcon from './icons/Camera';
import CameraFlipIcon from './icons/CameraFlip';
import ScreenShareIcon from './icons/ScreenShare';
import PictureInPictureIcon from './icons/PictureInPicture';
import MicrophoneIcon from './icons/Microphone';
import VideoSwapIcon from './icons/VideoSwap';
import {
  VideoWrapper,
  VideoContainer,
  VideoElement,
  VideoText,
  VideoButtonsContainer,
  FixedContainer,
  LeftButtonsContainer,
  RightButtonsContainer,
  VideoButton,
  TimerContainer,
  VideoTopButtonsContainer,
  VideoTopButton,
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
  const [videoHover, setVideoHover] = React.useState(false);
  const [displayCameraFlip, setDisplayCameraFlip] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);
  const [isRemoteMainVideo, setIsRemoteMainVideo] = React.useState(true);

  const displayVideoSwap = isShowingWebcam || isReceivingRemoteStream;
  const displayPictureInPicture =
    (isShowingWebcam && !isRemoteMainVideo) ||
    (isReceivingRemoteStream && isRemoteMainVideo);

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

  const onLeaveLocalPictureInPicture = () => {
    window.snapcallAPI.requestLocalVideo(localWebcamRef.current);
    localWebcamRef.current?.removeEventListener(
      'leavepictureinpicture',
      onLeaveLocalPictureInPicture
    );
  };

  const onLeaveRemotePictureInPicture = () => {
    window.snapcallAPI.displayRemoteVideo(remoteVideoRef.current);
    remoteVideoRef.current?.removeEventListener(
      'leavepictureinpicture',
      onLeaveRemotePictureInPicture
    );
  };

  const onPictureInPictureClick = () => {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture?.();
    } else if (isRemoteMainVideo) {
      remoteVideoRef.current?.requestPictureInPicture();
      remoteVideoRef.current?.addEventListener(
        'leavepictureinpicture',
        onLeaveRemotePictureInPicture
      );
    } else {
      localWebcamRef.current?.requestPictureInPicture();
      localWebcamRef.current?.addEventListener(
        'leavepictureinpicture',
        onLeaveLocalPictureInPicture
      );
    }
  };

  const onVideoSwapClick = () => {
    setIsRemoteMainVideo(previousValue => !previousValue);
  };

  const onRemoteStream = () => {
    setIsReceivingRemoteStream(true);
  };

  const onRemoteStreamEnd = () => {
    setIsReceivingRemoteStream(false);
    setIsIdle(false);
  };

  const onMouseMove = () => {
    setVideoHover(true);
    if (!isReceivingRemoteStream) return;
    if (videoButtonsTimeout.current) clearTimeout(videoButtonsTimeout.current);
    setIsIdle(false);
    videoButtonsTimeout.current = window.setTimeout(() => {
      setIsIdle(true);
    }, 2000);
  };

  const onMouseLeave = () => {
    setVideoHover(false);
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
        <VideoTopButtonsContainer>
          {displayPictureInPicture && (
            <VideoTopButton
              idle={!videoHover}
              onClick={onPictureInPictureClick}
            >
              <PictureInPictureIcon />
            </VideoTopButton>
          )}
        </VideoTopButtonsContainer>
        <VideoElement visible={isShowingWebcam} main={!isRemoteMainVideo}>
          <span>You</span>
          <video ref={localWebcamRef} />
        </VideoElement>
        <VideoElement
          visible={isReceivingRemoteStream}
          main={isRemoteMainVideo}
        >
          <video ref={remoteVideoRef} />
        </VideoElement>
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
                  {displayVideoSwap && (
                    <VideoButton onClick={onVideoSwapClick}>
                      <span>
                        <VideoSwapIcon />
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
