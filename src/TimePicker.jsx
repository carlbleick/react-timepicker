import React, { useState, useEffect } from "react";

import TimeSelectInterface from "./TimeSelectInterface";
import useOuterClick from "./useOuterClick";

const TimePicker = ({ value, onChange, inputClass = "", style = {}, showClear = false }) => {
  const [hours, setHours] = useState(null);
  const [minutes, setMinutes] = useState(null);

  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    if (hours === null && minutes === null) return;
    if (value === null) return onChange(new Date(value).setHours(hours, minutes, 0, 0));
    if (typeof value === "number") {
      const [h, m] = msIntoTime(value);
      if (h == hours && m == minutes) return;
      onChange(new Date(value).setHours(hours, minutes, 0, 0));
    } else if (typeof value === "string") {
      if (`${hours}:${minutes}` === value) return;
      onChange(`${hours}:${minutes}`);
    }
  }, [hours, minutes]);

  useEffect(() => {
    if (!value) return;
    if (typeof value === "number") {
      const [hours, minutes] = msIntoTime(value);
      setHours(hours);
      setMinutes(minutes);
    } else if (typeof value === "string") {
      let time = value.split(":");
      if (time.length != 2 || isNaN(time[0]) || isNaN(time[1])) {
        console.error(
          `Invalid argument "${value}", use a timestamp or "hh:mm" format instead `
        );
      } else {
        setHours(parseInt(time[0]));
        setMinutes(parseInt(time[1]));
      }
    } else {
      console.error(
        `Invalid argument "${value}", use a timestamp or "hh:mm" format instead `
      );
    }
  }, [value]);

  useEffect(() => {
    if (showPicker && hours === null && minutes === null) {
      setHours(0);
      setMinutes(0);
    }
  }, [showPicker])

  const withLeadingZero = (number) => {
    if (number <= 0) return "00";
    if (number >= 10) return number;
    return `0${number}`;
  };

  const msIntoTime = (timestamp) => {
    let date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return [hours, minutes];
  };

  const clearTime = () => {
    setHours(null);
    setMinutes(null);
  }

  const pickerRef = useOuterClick((e) => {
    setShowPicker(false);
  });

  return (
    <>
      <div id='time-picker' ref={pickerRef} style={style}>
        <input
          type='text'
          className={inputClass}
          value={(hours === null && minutes === null) ? '' : `${withLeadingZero(hours)}:${withLeadingZero(minutes)} Uhr`}
          readOnly
          tabIndex={showPicker ? -1 : 0}
          onFocus={(e) => setShowPicker(true)}
        />
        {showClear && hours !== null && minutes !== null && (
          <div className="tp-clear">
            <i className="tp-clear-icon" onClick={clearTime} />
          </div>
        )}

        {showPicker && (
          <TimeSelectInterface
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
