import { metaKeys } from './runKeys';

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
    if (term.includes('fsr-')) {
      upscale = 'FSR';
      data.DLSS = 'off';
    } else if (term.includes('dlss-')) {
      upscale = 'DLSS';
      data.FSR = 'off';
    } else {
      data.DLSS = 'off';
      data.FSR = 'off';
    }
    if (upscale) {
      let upPreset = 'off';
      upscaleOptions.forEach((op) => {
        if (term.includes(op)) upPreset = op;
      });
      data[upscale] = upPreset;
    }
  });
  return data;
};

const trimFrameTimes = (frameTimes, frameLimit = 2024) => {
  if (frameTimes.length <= frameLimit) return frameTimes;
  const newTimes = [...frameTimes];
  while (newTimes.length > frameLimit) {
    const cutIndex = Math.round(newTimes.length * Math.random());
    newTimes.splice(cutIndex, 100);
  }
  return newTimes;
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
    frameTimes: trimFrameTimes(frameTimes),
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

const compareCapture = (a, b) => metaKeys
  .every((key) => (!a[key] && !b[key]) || a[key] === b[key]);

const groupCaptures = (captures) => {
  const groups = [captures[0]];
  captures.slice(1).forEach((b) => {
    const matched = groups.find((a) => compareCapture(a, b));
    if (matched && matched.frameTimes) {
      matched.frameTimes.push(...b.frameTimes);
    } else {
      groups.push(b);
    }
  });
  const sortedGroups = groups
    .map((g) => {
      const avgFt = g.frameTimes.reduce((a, b) => a + b) / g.frameTimes.length;
      return { ...g, avgFt };
    })
    .sort((a, b) => b.avgFt - a.avgFt);
  return sortedGroups;
};

export { parseCapture, readCapture, groupCaptures };
