const secondsToTime = (timeInSeconds: number) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  let formattedMinutes = minutes.toString();
  let formattedSeconds = seconds.toString();
  if (minutes < 10) {
    formattedMinutes = `0${minutes}`;
  }
  if (seconds < 10) {
    formattedSeconds = `0${seconds}`;
  }
  return `${formattedMinutes}:${formattedSeconds}`;
};

export default secondsToTime;
