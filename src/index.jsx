import React, { useEffect, useState, useRef } from "react";
import { render } from "react-dom";
import TimePicker from "./TimePicker";

const App = () => {
  const [value, onChange] = useState("10:00");

  return (
    <div className='col'>
      <TimePicker value={value} onChange={onChange} />
      <input type="text"/>
      <TimePicker value={value} onChange={onChange} />
    </div>
  );
};

render(<App />, document.getElementById("app"));
