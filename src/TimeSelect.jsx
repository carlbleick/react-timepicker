import React, { useRef } from "react";

const TimeSelect = ({
  value,
  setValue,
  onKeyDown,
  limit,
  step = 1,
  autoFocus = false,
}) => {
  const inputRef = useRef(null);
  const selectInput = () => inputRef.current.focus();

  const leadingZero = (number) => {
    if (number <= 0) return "00";
    if (number >= 10) return number;
    return `0${number}`;
  };

  const adjustToInterval = (value) => {
    value = parseInt(value);
    if (!value || value < 0) return "00";
    if (value > limit) return limit; // limit.length always == 2
    return leadingZero(value);
  };
  return (
    <div className='col'>
      <div
        onClick={(e) => {
          setValue(adjustToInterval(parseInt(value) + step));
          selectInput();
        }}
        className={`${value == limit ? 'indicator-disabled' : 'indicator'} triangle-up`}
      ></div>
      <input
        ref={inputRef}
        type='number'
        step={step}
        className='number-input'
        value={value}
        onChange={(e) => setValue(adjustToInterval(e.target.value))}
        onKeyDown={onKeyDown}
        autoFocus={autoFocus}
        onFocus={(e) => e.target.select()}
      />
      <div
        onClick={(e) => {
          setValue(adjustToInterval(parseInt(value) - step));
          selectInput();
        }}
        className={`${value == 0 ? 'indicator-disabled' : 'indicator'} triangle-down`}
      ></div>
    </div>
  );
};

export default TimeSelect;