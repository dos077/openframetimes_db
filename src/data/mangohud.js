import Papa from 'papaparse';
import { trimFrameTimes } from './helpers';

const resOptions = ['720p', '1080p', '1440p', 'WQHD', '4K'];
const presetOptions = ['low', 'medium', 'high', 'ultra'];
const upscaleOptions = ['quality', 'balance', 'performance'];

const checkExt = ({ name }) => {
  const ext = name.substring(name.lastIndexOf('.') + 1);
  return ext.toLowerCase() === 'csv';
};

const lowerToCaps = ['cpu', 'gpu', 'os', 'ram'];

const parseRows = (rows) => {
  const info = {};
  rows[0].forEach((rawMeta, col) => {
    const meta = lowerToCaps.includes(rawMeta)
      ? rawMeta.toUpperCase()
      : rawMeta;
    info[meta] = rows[1][col];
  });
  const frameTimes = [];
  const ftCol = rows[2].indexOf('frametime');
  rows.slice(3).forEach((row) => frameTimes.push(row[ftCol]));
  return {
    info,
    frameTimes: trimFrameTimes(
      frameTimes.map((str) => Math.round(parseFloat(str) * 10) / 10000),
    ),
  };
};

const isCapture = (raw) => {
  const csvParsed = Papa.parse(raw);
  if (csvParsed.errors && csvParsed.errors.length > 0) return false;
  const rows = csvParsed.data;
  if (!lowerToCaps.every((word) => rows[0].includes(word))) return false;
  if (!rows[2] || !rows[2].includes('frametime')) return false;
  return true;
};

const interpretFileName = (fileName) => {
  const data = {};
  const terms = fileName.split('_').map((str) => str.toLowerCase());
  data.gameName = terms.shift();
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

const parseCapture = (raw, fileName) => {
  const csvParsed = Papa.parse(raw);
  if (csvParsed.errors && csvParsed.errors.length > 0) return false;
  const { info, frameTimes } = parseRows(csvParsed.data);
  return {
    info: { ...info, ...interpretFileName(fileName) },
    frameTimes,
  };
};

export default {
  checkExt,
  isCapture,
  parseCapture,
};
