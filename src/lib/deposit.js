const MAX_YIELD = 10000e6; // 10000 tonnes in grams
const CORE_SAMPLING_TIME = 86400; // in-game time in seconds

const STATUSES = {
  UNDISCOVERED: 0,
  SAMPLING: 1,
  SAMPLED: 2,
  USED: 3
};

const getSampleBounds = (abundance, initialYield = 0, totalBonus = 1) => {
  let lower = initialYield;
  let upper = abundance * MAX_YIELD;

  if (totalBonus < 1) upper = lower + (upper - lower) * totalBonus;
  if (totalBonus > 1) lower = upper - (upper - lower) / totalBonus;

  return { lower, upper };
};

const getSampleTime = (totalBonus = 1) => {
  return Math.ceil(CORE_SAMPLING_TIME / totalBonus);
};

export default {
  MAX_YIELD,
  CORE_SAMPLING_TIME,
  SAMPLE_TIME: CORE_SAMPLING_TIME, // legacy
  STATUSES,

  getSampleBounds,
  getSampleTime
};
