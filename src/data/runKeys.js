const requiredKeys = [
  'CPU', 'GPU', 'RAM', 'gameName', 'resolution', 'gamePreset', 'userId', 'frameTimes', 'FSR', 'DLSS',
];

const optionalKeys = [
  'syncCap', 'comment', 'creationDate', 'driver',
];

const metaKeys = [
  'CPU', 'GPU', 'RAM', 'gameName', 'resolution', 'gamePreset',
  'syncCap', 'FSR', 'DLSS',
];

export { requiredKeys, optionalKeys, metaKeys };
