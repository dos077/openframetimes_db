const threshHolds = [
  { fps: 120, ms: 8.33 },
  { fps: 90, ms: 11.11 },
  { fps: 72, ms: 13.88 },
  { fps: 60, ms: 16.66 },
  { fps: 50, ms: 20 },
  { fps: 40, ms: 25 },
  { fps: 30, ms: 33.33 },
  { fps: 20, ms: 50 },
  { fps: 15, ms: 66.66 },
];

const parseFrameTime = (frameTimes) => {
  const fts = [];
  frameTimes.forEach((delta) => {
    fts.push(Math.round(delta * 100000) / 100);
  });
  const groups = threshHolds.map((threshHold) => ({
    threshHold,
    frames: [],
  }));
  groups.push({ frames: [] });
  fts.forEach((ft) => {
    for (let i = 0; i < threshHolds.length; i += 1) {
      const threshHold = threshHolds[i];
      if (ft <= threshHold.ms) {
        groups[i].frames.push(ft);
        break;
      }
      if (i === threshHold.length - 1) {
        groups[i + 1].frames.push(ft);
      }
    }
  });
  return {
    totalFrames: fts.length,
    totalTime: fts.reduce((a, b) => a + b),
    groups,
  };
};

const labels = threshHolds.map(({ fps }) => fps).reverse();
labels.unshift('low');

const infoKeys = [
  'CPU', 'GPU', 'RAM', 'gameName', 'resolution', 'refresh', 'gamePreset', 'FSR', 'DLSS',
];

const getSharedKeys = (captures) => {
  if (!captures || captures.length === 0) return null;
  const shared = infoKeys
    .filter((key) => {
      const refVal = captures[0].info[key];
      return refVal && captures.every(({ info }) => info[key] === refVal);
    });
  return {
    shared, different: infoKeys.filter((key) => !shared.includes(key)),
  };
};

const plotChart = ({ info, frameTimes }) => {
  const { totalTime, groups } = parseFrameTime(frameTimes);
  const dataset = [];
  let tSum = 0;
  for (let i = 0; i < groups.length; i += 1) {
    const { frames } = groups[i];
    if (frames && frames.length) {
      tSum += frames.reduce((a, b) => a + b);
    }
    const base = (tSum / totalTime) ** 3;
    dataset.push(10 ** base - 1);
  }
  return {
    chartTitle: infoKeys.slice(0, 3).map((key) => info[key]).join(', '),
    chartData: {
      labels,
      datasets: [{
        label: infoKeys.slice(3).filter((k) => info[k]).map((k) => info[k]).join('|'),
        data: dataset.reverse(),
        lineTension: 0.2,
      }],
    },
  };
};

const plotMulti = (captures) => {
  if (captures.length === 1) return plotChart(captures[0]);
  const datasets = [];
  const keys = getSharedKeys(captures);
  captures.forEach(({ info, frameTimes }) => {
    const { totalTime, groups } = parseFrameTime(frameTimes);
    const dataset = [];
    let tSum = 0;
    for (let i = 0; i < groups.length; i += 1) {
      const { frames } = groups[i];
      if (frames && frames.length) {
        tSum += frames.reduce((a, b) => a + b);
      }
      const base = (tSum / totalTime) ** 2;
      dataset.push(10 ** base - 1);
    }
    datasets.push({
      label: keys.different.filter((key) => info[key]).map((key) => info[key]).join('|'),
      data: dataset.reverse(),
      lineTension: 0.2,
    });
  });
  const chartTitle = keys.shared.map((key) => captures[0].info[key]).join(', ');
  return {
    chartTitle,
    chartData: {
      labels, datasets,
    },
  };
};

export { plotMulti, plotChart };
