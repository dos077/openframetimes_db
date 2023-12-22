import { trimFrameTimes } from './helpers';

const resOptions = ['720p', '1080p', '1440p', 'WQHD', '4K'];
const presetOptions = ['low', 'medium', 'high', 'ultra'];
const upscaleOptions = ['quality', 'balance', 'performance'];

const isCapture = (raw) => {
  const data = JSON.parse(raw);
  console.log('checking json', data);
  const { Info, Runs } = data;
  return Info && Runs && Runs.length > 0;
};

const interpretComment = (comment) => {
  const data = {};
  const terms = comment.split(' ').map((str) => str.toLowerCase());
  const leftOvers = [];
  terms.forEach((term) => {
    let isLeftOver = true;
    resOptions.forEach((res) => {
      if (term.includes(res.toLocaleLowerCase())) {
        data.resolution = res;
        isLeftOver = false;
      }
    });
    presetOptions.forEach((preset) => {
      if (term.includes(preset.toLocaleLowerCase())) {
        data.gamePreset = preset;
        isLeftOver = false;
      }
    });
    let upscale = false;
    if (term.includes('fsr-')) {
      upscale = 'FSR';
    } else if (term.includes('dlss-')) {
      upscale = 'DLSS';
    }
    if (upscale) {
      isLeftOver = false;
      let upPreset = null;
      upscaleOptions.forEach((op) => {
        if (term.includes(op)) upPreset = op;
      });
      if (upPreset) data.upscale = `${upscale}-${upPreset}`;
    }
    if (isLeftOver) leftOvers.push(term);
  });
  if (!data.upscale) data.upscale = 'off';
  console.log('left over comment', leftOvers);
  return { data, newComment: leftOvers.join(' ') };
};

const parseCapture = (raw) => {
  const { Info, Runs } = JSON.parse(raw);
  const {
    Processor, ProcessName, CreationDate, OS, SystemRam, GPU, Comment, GPUDriverVersion,
  } = Info;
  const frameTimes = [];
  Runs.forEach((run) => {
    run.CaptureData.TimeInSeconds.slice(1).forEach((t, i) => {
      frameTimes.push(t - run.CaptureData.TimeInSeconds[i]);
    });
  });
  const commentData = interpretComment(Comment);
  return {
    info: {
      CPU: Processor,
      gameName: ProcessName.replace('.exe', ''),
      creationDate: new Date(CreationDate),
      OS,
      RAM: SystemRam,
      GPU,
      comment: commentData.newComment,
      driver: GPUDriverVersion,
      ...commentData.data,
    },
    frameTimes: trimFrameTimes(frameTimes),
  };
};

const checkExt = (file) => {
  const fn = file.name;
  const ext = fn.substring(fn.lastIndexOf('.') + 1);
  return ext.toLowerCase() === 'json';
};

export default {
  isCapture,
  parseCapture,
  checkExt,
};
