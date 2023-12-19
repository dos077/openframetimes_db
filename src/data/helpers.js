/* eslint-disable import/prefer-default-export */
const trimFrameTimes = (frameTimes, frameLimit = 2024) => {
  let maxFrame = 0;
  let minFrame = 999;
  frameTimes.forEach((ft) => {
    if (ft > maxFrame) maxFrame = ft;
    else if (ft < minFrame) minFrame = ft;
  });
  console.log('frame range', minFrame, maxFrame);
  if (frameTimes.length <= frameLimit) return frameTimes;
  const newTimes = [...frameTimes];
  while (newTimes.length > frameLimit) {
    const cutIndex = Math.round(newTimes.length * Math.random());
    newTimes.splice(cutIndex, 100);
  }
  return newTimes;
};

export { trimFrameTimes };
