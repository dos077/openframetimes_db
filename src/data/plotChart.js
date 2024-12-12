import { metaKeys } from './runKeys';

const threshHolds = [
  { fps: 240, ms: 4.17 },
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
/*
const frameTimesCompliancOld = (frameTimes, threshHold) => {
  let tIndex = 0;
  let frameTime = frameTimes[0];
  let frame = 1;
  let onTime = 0;
  const { fps } = threshHold;
  while (tIndex < frameTimes.length) {
    const target = frame / fps;
    if (frameTime < target) onTime += 1;
    while (frameTime < target) {
      tIndex += 1;
      if (tIndex >= frameTimes.length) break;
      frameTime += frameTimes[tIndex];
    }
    frame += 1;
  }
  return onTime / (frame - 1);
}; */

const frameTimesCompliance = (frameTimes, threshHold) => {
  const sDelta = 1 / threshHold.fps;
  let hit = 0;
  let miss = 0;
  let time = 0;
  for (let i = 0; i < frameTimes.length; i += 1) {
    time += frameTimes[i];
    if (time > 0) {
      while (time > sDelta) {
        miss += 1;
        time -= sDelta;
      }
      hit += 1;
      time -= sDelta;
    }
  }
  return hit / (hit + miss);
};

/*
const framesOnTimes = (frameTimes, threshHold) => {
  const { ms } = threshHold;
  let onTime = 0;
  let total = 0;
  frameTimes.forEach((delta) => {
    total += delta;
    if (delta < ms) onTime += delta;
  });
  return onTime / total;
}; */

const parseFrameTime = (frameTimes) => {
  const groups = threshHolds.map((threshHold) => ({
    threshHold,
    compliance: frameTimesCompliance(frameTimes, threshHold),
  }));
  return groups;
};

const labels = threshHolds.map(({ fps }) => fps).reverse();

const getSharedKeys = (captures, refKeys) => {
  if (!captures || captures.length < 2) return null;
  const shared = refKeys
    .filter((key) => captures.some((c) => c[key])
      && captures.slice(1).every((c, i) => c[key] === captures[i][key]));
  return {
    shared, different: refKeys.filter((key) => !shared.includes(key)),
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

const mapValY = (y) => {
  if (y > 0.998) return 9;
  return Math.log(1 - y) / Math.log(0.5);
};

const Plotter = () => {
  let refKeys = metaKeys;
  let exponent = 2;

  const setRefKeys = (newKeys) => { if (newKeys) refKeys = newKeys; };

  const getExponent = () => exponent;
  const setExponent = (newEx) => { exponent = newEx; };

  const plotChart = (capture) => {
    const { frameTimes } = capture;
    const groups = parseFrameTime(frameTimes);
    const dataset = groups
      .map(({ compliance }) => mapValY(compliance));
    return {
      chartTitle: refKeys.slice(0, 3).map((key) => capture[key]).join(', '),
      chartData: {
        labels,
        datasets: [{
          label: refKeys.slice(3).filter((k) => capture[k]).map((k) => capture[k]).join('|'),
          data: dataset.reverse(),
          lineTension: 0.2,
        }],
      },
    };
  };

  const plotMulti = (captures, colors) => {
    if (captures.length === 1) return plotChart(captures[0]);
    const datasets = [];
    const keys = getSharedKeys(captures, refKeys);
    console.log('plotting with keys', keys);
    captures.forEach((capture, cIndex) => {
      const { frameTimes } = capture;
      const groups = parseFrameTime(frameTimes);
      const dataset = groups
        .map(({ compliance }) => mapValY(compliance));
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
    return plotMulti(captures, colors.length ? colors : undefined);
  };

  return {
    plotMulti, plotChart, plotGroups, getExponent, setExponent, setRefKeys,
  };
};

export default Plotter;
