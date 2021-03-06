const toInterval_Input = (value, limit) => {
  value = parseInt(value);
  if (!value || value < 0) return 0;
  if (value > limit) return limit;
  return value;
};

const toInterval_Step = (value, step, limit) => {
  value = parseInt(value);
  if (value < 0) return Math.floor(limit / step) * step;
  if (value > limit) return 0;
  return value;
};

const increaseToStep = (value, step, limit) => {
  return toInterval_Step(
    parseInt(value) + (step - (parseInt(value) % step)),
    step,
    limit
  );
};

const decreaseToStep = (value, step, limit) => {
  let subtrahend = parseInt(value) % step == 0 ? step : parseInt(value) % step;
  return toInterval_Step(parseInt(value) - subtrahend, step, limit);
};

const withLeadingZeros = (value) => {
  if (value === null) return "00";
  if (value < 10) return `0${value}`;
  return value;
};

export {
  toInterval_Input,
  toInterval_Step,
  increaseToStep,
  decreaseToStep,
  withLeadingZeros,
};
