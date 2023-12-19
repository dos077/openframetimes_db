import { metaKeys } from './runKeys';
import { trimFrameTimes } from './helpers';
import CapFrameX from './capFrameX';
import Mangohud from './mangohud';

const resOptions = ['720p', '1080p', '1440p', 'WQHD', '4K'];
const presetOptions = ['low', 'medium', 'high', 'ultra'];
const upscaleOptions = ['quality', 'balance', 'performance'];

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

const readRaw = async (file) => new Promise((resolve, reject) => {
  const fileReader = new FileReader();
  fileReader.onload = (event) => resolve(event.target.result);
  fileReader.onerror = (error) => reject(error);
  fileReader.readAsText(file);
});

const readParse = async (file) => {
  const isExt = CapFrameX.checkExt(file) || Mangohud.checkExt(file);
  if (!isExt) return false;
  const rawData = await readRaw(file);
  if (CapFrameX.checkExt(file) && CapFrameX.isCapture(rawData)) {
    return CapFrameX.parseCapture(rawData);
  }
  if (Mangohud.checkExt(file) && Mangohud.isCapture(rawData)) {
    return Mangohud.parseCapture(rawData, file.name);
  }
  return false;
};

const compareCapture = (a, b, refKeys) => refKeys
  .every((key) => (!a[key] && !b[key]) || a[key] === b[key]);

const groupCaptures = (captures, refKeys = metaKeys) => {
  const groups = [captures[0]];
  captures.slice(1).forEach((b) => {
    const matched = groups.find((a) => compareCapture(a, b, refKeys));
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

export {
  parseCapture, readCapture, groupCaptures, trimFrameTimes, readParse,
};
