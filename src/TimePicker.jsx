import React, { useState, useEffect, useRef } from "react";
import "./styles.css";
import useOuterClick from "./useOuterClick";

const SelectWrapper = ({
  hours,
  setHours,
  minutes,
  setMinutes,
  setShowPicker,
}) => {
  const keyDownHours = (e) => {
    if (e.key === "Escape") return setShowPicker(false);
    return ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault();
  };

  const keyDownMinutes = (e) => {
    if (["Tab", "Escape"].includes(e.key)) return setShowPicker(false);
    return ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault();
  };

  return (
    <>
      <div className='row wrapper'>
        <NumberSelector
          value={hours}
          setValue={setHours}
          onKeyDown={keyDownHours}
          limit={23}
          autoFocus={true}
        />
        <p> : </p>
        <NumberSelector
          value={minutes}
          setValue={setMinutes}
          onKeyDown={keyDownMinutes}
          limit={59}
          step={5}
        />
      </div>
    </>
  );
};

const NumberSelector = ({
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

const TimePicker = ({ value, onChange }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    if (!hours && !minutes) return;
    if (`${hours}:${minutes}` === value) return;
    onChange(`${hours}:${minutes}`);
  }, [hours, minutes]);

  useEffect(() => {
    let time = value.split(":");
    setHours(time[0]);
    setMinutes(time[1]);
  }, [value]);

  const pickerRef = useOuterClick((e) => {
    setShowPicker(false);
  });

  return (
    <>
      <div
        ref={pickerRef}
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "5%",
          position: "relative",
        }}
      >
        <input
          type='text'
          value={`${hours}:${minutes} Uhr`}
          readOnly
          onFocus={(e) => setShowPicker(true)}
        />
        {showPicker && (
          <SelectWrapper
            hours={hours}
            setHours={setHours}
            minutes={minutes}
            setMinutes={setMinutes}
            setShowPicker={setShowPicker}
          />
        )}
      </div>
    </>
  );
};

export default TimePicker;
