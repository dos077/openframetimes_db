const requiredKeys = [
  'CPU', 'GPU', 'RAM', 'gameName', 'resolution', 'gamePreset', 'userId', 'frameTimes', 'upscale',
];

const optionalKeys = [
  'syncCap', 'creationDate', 'driver', 'comment',
];

const metaKeys = [
  'CPU', 'GPU', 'RAM', 'gameName', 'resolution', 'gamePreset',
  'syncCap', 'upscale',
];

export { requiredKeys, optionalKeys, metaKeys };
