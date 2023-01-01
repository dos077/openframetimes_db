import { metaKeys } from './runKeys';

const threshHolds = [
  { fps: 120, ms: 8.34 },
  { fps: 90, ms: 11.12 },
  { fps: 72, ms: 13.89 },
  { fps: 60, ms: 16.67 },
  { fps: 50, ms: 20 },
  { fps: 40, ms: 25 },
  { fps: 30, ms: 33.34 },
  { fps: 20, ms: 50 },
  { fps: 15, ms: 66.67 },
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
  fts.forEach((ft) => {
    for (let i = 0; i < threshHolds.length; i += 1) {
      const threshHold = threshHolds[i];
      if (ft <= threshHold.ms) {
        groups[i].frames.push(ft);
        break;
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

const getSharedKeys = (captures) => {
  if (!captures || captures.length < 2) return null;
  const shared = metaKeys
    .filter((key) => captures.some((c) => c[key])
      && captures.slice(1).every((c, i) => c[key] === captures[i][key]));
  return {
    shared, different: metaKeys.filter((key) => !shared.includes(key)),
  };
};

const plotChart = (capture) => {
  const { frameTimes } = capture;
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
    chartTitle: metaKeys.slice(0, 3).map((key) => capture[key]).join(', '),
    chartData: {
      labels,
      datasets: [{
        label: metaKeys.slice(3).filter((k) => capture[k]).map((k) => capture[k]).join('|'),
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
  captures.forEach((capture) => {
    const { frameTimes } = capture;
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
      label: keys.different
        .filter((key) => capture[key])
        .map((key) => capture[key]).join('|'),
      data: dataset.reverse(),
      lineTension: 0.2,
    });
  });
  const chartTitle = keys.shared.map((key) => captures[0][key]).join(', ');
  return {
    chartTitle,
    chartData: {
      labels, datasets,
    },
  };
};

const compareCapture = (a, b) => metaKeys
  .every((key) => (!a[key] && !b[key]) || a[key] === b[key]);

const plotGroups = (captures) => {
  if (captures.length < 2) return plotChart(captures[0]);
  console.log('grouping', captures);
  const groups = [captures[0]];
  captures.slice(1).forEach((b) => {
    const matched = groups.find((a) => compareCapture(a, b));
    if (matched && matched.frameTimes) {
      matched.frameTimes.push(...b.frameTimes);
    } else {
      groups.push(b);
    }
  });
  return plotMulti(groups);
};

export { plotMulti, plotChart, plotGroups };
