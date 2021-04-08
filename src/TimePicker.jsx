import React, { useState, useEffect } from "react";

import TimeSelectInterface from "./TimeSelectInterface"
import useOuterClick from "./useOuterClick";

const TimePicker = ({ value, onChange, inputClass = '' }) => {
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
          className={inputClass}
          value={`${hours}:${minutes} Uhr`}
          readOnly
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