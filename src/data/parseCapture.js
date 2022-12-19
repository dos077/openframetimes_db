const parseCapFrameX = ({ Info, Runs }) => {
  const {
    Processor, GameName, CreationDate, OS, SystemRam, GPU, Comment, GPUDriverVersion,
  } = Info;
  const frameTimes = [];
  Runs.forEach((run) => {
    run.CaptureData.TimeInSeconds.slice(1).forEach((t, i) => {
      frameTimes.push(t - run.CaptureData.TimeInSeconds[i]);
    });
  });
  return {
    info: {
      CPU: Processor,
      gameName: GameName,
      date: new Date(CreationDate),
      OS,
      RAM: SystemRam,
      GPU,
      comment: Comment,
      driver: GPUDriverVersion,
    },
    frameTimes,
  };
};

const parseCapture = (rawData) => {
  const isCapFrameX = rawData.Info
    && rawData.Runs
    && rawData.Runs.length > 0;
  if (isCapFrameX) return parseCapFrameX(rawData);
  return null;
};

const readCapture = async (file) => new Promise((resolve, reject) => {
  const fileReader = new FileReader();
  fileReader.onload = (event) => resolve(JSON.parse(event.target.result));
  fileReader.onerror = (error) => reject(error);
  fileReader.readAsText(file);
});

export { parseCapture, readCapture };
