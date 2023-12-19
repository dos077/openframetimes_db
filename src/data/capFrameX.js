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
  terms.forEach((term) => {
    resOptions.forEach((res) => {
      if (term.includes(res.toLocaleLowerCase())) data.resolution = res;
    });
    presetOptions.forEach((preset) => {
      if (term.includes(preset.toLocaleLowerCase())) data.gamePreset = preset;
    });
    let upscale = false;
    if (term.includes('fsr-')) {
      upscale = 'FSR';
    } else if (term.includes('dlss-')) {
      upscale = 'DLSS';
    }
    if (upscale) {
      let upPreset = null;
      upscaleOptions.forEach((op) => {
        if (term.includes(op)) upPreset = op;
      });
      if (upPreset) data.upscale = `${upscale}-${upPreset}`;
    }
  });
  if (!data.upscale) data.upscale = 'off';
  return data;
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
  return {
    info: {
      CPU: Processor,
      gameName: ProcessName.replace('.exe', ''),
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
