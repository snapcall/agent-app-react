interface MicrophoneCheckOptions {
  onMicrophoneUp?: () => void;
  onMicrophoneDown?: () => void;
}

let interval: number | null = null;
let checkingSince = 0;
let microphoneLevelSum = 0;
let numberOfFailedCheckInARow = 0;
let lastState = 'up';

const onMicrophoneLevel = (event: CustomEvent) => {
  const { value: microphoneLevel } = event.detail.data;
  microphoneLevelSum += microphoneLevel;
};

export const endMicrophoneLevelCheck = () => {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
  window.removeEventListener(
    'snapcallEvent_audioLevelLocalMicrophone',
    onMicrophoneLevel as EventListener
  );
  checkingSince = 0;
  microphoneLevelSum = 0;
  numberOfFailedCheckInARow = 0;
};

const microphoneCheck = ({
  onMicrophoneDown,
  onMicrophoneUp,
}: MicrophoneCheckOptions) => {
  if (checkingSince >= 10 && lastState === 'up') {
    endMicrophoneLevelCheck();
    return;
  }
  if (microphoneLevelSum < 1) {
    numberOfFailedCheckInARow += 1;
    if (numberOfFailedCheckInARow >= 5) {
      lastState = 'down';
      numberOfFailedCheckInARow = 0;
      if (onMicrophoneDown) onMicrophoneDown();
    }
  } else {
    if (onMicrophoneUp) onMicrophoneUp();
    numberOfFailedCheckInARow = 0;
    lastState = 'up';
  }
  microphoneLevelSum = 0;
  checkingSince += 1;
};

export const checkMicrophoneLevel = (options: MicrophoneCheckOptions) => {
  window.addEventListener(
    'snapcallEvent_audioLevelLocalMicrophone',
    onMicrophoneLevel as EventListener
  );
  const bindedCheck = microphoneCheck.bind(null, options);
  interval = window.setInterval(bindedCheck, 1000);
};
