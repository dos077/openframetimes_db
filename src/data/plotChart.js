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

const remapKeys = {
  FSR: (val) => `FSR-${val}`,
  DLSS: (val) => `DLSS-${val}`,
};

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

const getColors = ({ r, g, b }, n) => {
  const colors = [];
  for (let i = 0; i < n; i += 1) {
    const a = 1 - ((0.8 * i) / n);
    colors.push(`rgba(${r}, ${g}, ${b}, ${a})`);
  }
  return colors;
};

/*
const compareCapture = (a, b) => metaKeys
  .every((key) => (!a[key] && !b[key]) || a[key] === b[key]);

const plotGroups = (captures) => {
  if (captures.length < 2) return plotChart(captures[0]);
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
  return plotMulti(sortedGroups);
}; */

const Plotter = () => {
  let exponent = 2;

  const getExponent = () => exponent;
  const setExponent = (newEx) => { exponent = newEx; };

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
      const base = (tSum / totalTime) ** exponent;
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

  const plotMulti = (captures, colors) => {
    if (captures.length === 1) return plotChart(captures[0]);
    const datasets = [];
    const keys = getSharedKeys(captures);
    captures.forEach((capture, cIndex) => {
      const { frameTimes } = capture;
      const { totalTime, groups } = parseFrameTime(frameTimes);
      const dataset = [];
      let tSum = 0;
      for (let i = 0; i < groups.length; i += 1) {
        const { frames } = groups[i];
        if (frames && frames.length) {
          tSum += frames.reduce((a, b) => a + b);
        }
        const base = (tSum / totalTime) ** exponent;
        dataset.push(10 ** base - 1);
      }
      datasets.push({
        label: keys.different
          .filter((key) => capture[key])
          .map((key) => (remapKeys[key] ? remapKeys[key](capture[key]) : capture[key]))
          .join('|'),
        data: dataset.reverse(),
        borderColor: colors ? colors[cIndex] : undefined,
        backgroundColor: colors ? colors[cIndex] : undefined,
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

  const plotGroups = (groups, mainColors) => {
    const captures = [];
    const colors = [];
    groups.forEach((group, i) => {
      captures.push(...group);
      if (mainColors) colors.push(...getColors(mainColors[i], group.length));
    });
    console.log('plotting with colors', colors);
    return plotMulti(captures, colors.length ? colors : undefined);
  };

  return {
    plotMulti, plotChart, plotGroups, getExponent, setExponent,
  };
};

export default Plotter();
