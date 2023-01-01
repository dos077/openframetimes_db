const resOptions = ['720p', '1080p', '1440p', 'WQHD', '4K'];
const presetOptions = ['low', 'medium', 'high', 'ultra'];
const upscaleOptions = ['quality', 'balanced', 'performance'];

const interpretComment = (comment) => {
  const data = {};
  comment.split(' ').forEach((tString) => {
    const term = tString.toLowerCase();
    resOptions.forEach((res) => {
      if (term.includes(res.toLocaleLowerCase())) data.resolution = res;
    });
    presetOptions.forEach((preset) => {
      if (term.includes(preset.toLocaleLowerCase())) data.gamePreset = preset;
    });
    let upscale = false;
    if (term.includes('fsr-')) upscale = 'FSR';
    if (term.includes('dlss-')) upscale = 'DLSS';
    if (upscale) {
      upscaleOptions.forEach((upPreset) => {
        if (term.includes(upPreset)) data[upscale] = upPreset;
      });
    }
  });
  return data;
};

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
      creationDate: new Date(CreationDate),
      OS,
      RAM: SystemRam,
      GPU,
      comment: Comment,
      driver: GPUDriverVersion,
      ...interpretComment(Comment),
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
