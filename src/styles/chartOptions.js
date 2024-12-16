const makeOptions = () => {
  const options = {};
  return options;
};

const setAspect = ({ options, chartMax }) => {
  const newOptions = { ...options };
  if (chartMax > 5) {
    newOptions.aspectRatio = 2;
  } else {
    newOptions.aspectRatio = 1;
  }
  return newOptions;
};

const setScales = ({ options, chartBase, chartMax }) => {
  const newOptions = { ...options };
  newOptions.scales = {};
  newOptions.scales.x = {};
  newOptions.scales.x.ticks = {};
  newOptions.scales.x.ticks.font = { size: 14 };
  newOptions.scales.x.display = true;
  newOptions.scales.y = {};
  newOptions.scales.y.display = true;
  newOptions.scales.y.ticks = {};
  newOptions.scales.y.ticks.font = { size: 14 };
  newOptions.scales.y.ticks.callback = (val) => {
    if (val < 1) return '0';
    if (val >= chartMax) return '100%';
    return `${Math.round((1 - chartBase ** val) * 1000) / 10}`;
  };
  newOptions.scales.y.ticks.beginAtZero = true;
  newOptions.scales.y.ticks.stepSize = 1;
  newOptions.scales.y.max = chartMax;
  return newOptions;
};

const setPluginsTitle = ({ options, mini, chartTitle }) => {
  const newOptions = { ...options };
  if (!newOptions.plugins) newOptions.plugins = {};
  newOptions.plugins.title = {};
  newOptions.plugins.title.display = !mini;
  newOptions.plugins.title.text = chartTitle;
  return newOptions;
};

const setPluginsTooltip = ({ options, chartBase, chartMax }) => {
  const newOptions = { ...options };
  if (!newOptions.plugins) newOptions.plugins = {};
  newOptions.plugins.tooltip = {};
  newOptions.plugins.tooltip.intersect = false;
  newOptions.plugins.tooltip.mode = 'index';
  newOptions.plugins.tooltip.bodyFont = { size: 14 };
  newOptions.plugins.tooltip.yAlign = 'top';
  newOptions.plugins.tooltip.itemSort = (a, b) => b.raw - a.raw;
  newOptions.plugins.tooltip.callbacks = {};
  newOptions.plugins.tooltip.callbacks.label = (context) => {
    const val = context.parsed.y;
    const lineLabel = context.dataset.label;
    if (val === chartMax) return `${lineLabel}: Full`;
    if (val < 1) return `${lineLabel}: Low`;
    return `${lineLabel}: ${Math.round((1 - chartBase ** val) * 1000) / 10}%`;
  };
  newOptions.plugins.tooltip.callbacks.title = (context) => `${context[0].label}FPS Target`;
  return newOptions;
};

const setPluginsBackground = ({ options, color }) => {
  const newOptions = { ...options };
  if (!newOptions.plugins) newOptions.plugins = {};
  newOptions.plugins.background = {};
  newOptions.plugins.background.color = color;
  return newOptions;
};

export {
  makeOptions,
  setAspect,
  setScales,
  setPluginsTitle,
  setPluginsTooltip,
  setPluginsBackground,
};
