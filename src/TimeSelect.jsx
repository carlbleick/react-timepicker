import React, { useState, useRef, useEffect } from "react";
import {
  toInterval_Input,
  toInterval_Step,
  decreaseToStep,
  increaseToStep,
} from "./helpers";

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

  const [active, setActive] = useState(false);

  useEffect(() => {
    const keyListener = (e) => {
      if (active) {
        if (e.key === "ArrowUp") {
          e.preventDefault();
          setValue(increaseToStep(value, step, limit));
          selectInput();
        }
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setValue(decreaseToStep(value, step, limit));
          selectInput();
        }
        if (e.ctrlKey && ["v", "V"].includes(e.key)) {
          e.preventDefault();
        }
        if (e.key === "0" && value == 0) {
          e.preventDefault();
        }
      }
    };

    const wheelListener = (e) => {
      if (active) {
        if (e.deltaY < 0) {
          setValue(increaseToStep(value, step, limit));
          selectInput();
        } else if (e.deltaY > 0) {
          setValue(decreaseToStep(value, step, limit));
          selectInput();
        }
      }
    };

    if (active) {
      document.addEventListener("keydown", keyListener);
      document.addEventListener("wheel", wheelListener);
    }

    return () => {
      document.removeEventListener("keydown", keyListener);
      document.removeEventListener("wheel", wheelListener);
    };
  }, [active, value]);

  const handleChangeInput = (event) => {
    setValue(toInterval_Input(event.target.value, limit));
  };

  return (
    <div className='col'>
      <div
        onClick={(_) => {
          setValue(increaseToStep(value, step, limit));
          selectInput();
        }}
        className={`indicator triangle-up`}
      ></div>
      <input
        ref={inputRef}
        type='number'
        className='number-input'
        value={value}
        step={null}
        onChange={handleChangeInput}
        onKeyDown={onKeyDown}
        autoFocus={autoFocus}
        onFocus={(e) => {
          e.target.select();
          setActive(true);
        }}
        onBlur={(_) => setActive(false)}
      />
      <div
        onClick={(_) => {
          setValue(decreaseToStep(value, step, limit));
          selectInput();
        }}
        className={`indicator triangle-down`}
      ></div>
    </div>
  );
};

export default TimeSelect;
