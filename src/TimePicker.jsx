import React, { useState, useEffect } from "react";

import TimeSelectInterface from "./TimeSelectInterface";
import useOuterClick from "./useOuterClick";

const TimePicker = ({ value, onChange, inputClass = "" }) => {
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

  const withLeadingZero = (number) => {
    if (number <= 0) return "00";
    if (number >= 10) return number;
    return `0${number}`;
  };

  const pickerRef = useOuterClick((e) => {
    setShowPicker(false);
  });

  return (
    <>
      <div ref={pickerRef}>
        <input
          type='text'
          className={inputClass}
          value={`${withLeadingZero(hours)}:${withLeadingZero(minutes)} Uhr`}
          readOnly
          tabIndex={showPicker ? -1 : 0}
          onFocus={(e) => setShowPicker(true)}
        />
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
