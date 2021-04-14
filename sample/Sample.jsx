import React, { useState } from 'react';
import TimePicker from '@carlbleick/react-timepicker';

import './Sample.css'

const Sample = () => {
    const [value, onChange] = useState("10:00");
    return (
        <div className='center'>
            Sample Page for @carlbleick/react-timepicker
            <input type="text" name="test" id="test" placeholder='Test Input'/>
            <TimePicker value={value} onChange={onChange} />
            <button>Test Button</button>
            <input type="text" name="test2" id="test2" placeholder='Test Input 2'/>
        </div>
    )
}

export default Sample;