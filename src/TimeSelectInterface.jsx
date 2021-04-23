import React from "react";
import TimeSelect from "./TimeSelect";

const TimeSelectInterface = ({
  hours,
  setHours,
  minutes,
  setMinutes,
  setShowPicker,
}) => {
  const keyDownHours = (e) => {
    if (e.key === "Escape") return setShowPicker(false);
    if (e.key === "Tab" && e.shiftKey) {
      return setTimeout((_) => setShowPicker(false), 0);
    }
    return ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault();
  };

  const keyDownMinutes = (e) => {
    if (["Tab", "Escape"].includes(e.key)) return setShowPicker(false);
    return ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault();
  };

  return (
    <>
      <div className='tp-row tp-wrapper'>
        <TimeSelect
          value={hours}
          setValue={setHours}
          onKeyDown={keyDownHours}
          limit={23}
          autoFocus={true}
        />
        <span> : </span>
        <TimeSelect
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

export default TimeSelectInterface;
