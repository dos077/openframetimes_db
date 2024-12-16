const requiredKeys = [
  'CPU', 'RAM', 'GPU', 'gameName', 'resolution', 'gamePreset', 'userId', 'frameTimes', 'upscale',
];

const optionalKeys = [
  'syncCap', 'creationDate', 'driver', 'comment',
];

const metaKeys = [
  'CPU', 'RAM', 'GPU', 'gameName', 'resolution', 'gamePreset',
  'syncCap', 'upscale',
];

export { requiredKeys, optionalKeys, metaKeys };
