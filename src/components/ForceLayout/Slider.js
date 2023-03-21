import React, { useState } from 'react';

const Slider = ({ onChange }) => {
  const [value, setValue] = useState(50);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    onChange(newValue);
  }

  return (
    <div>
      <input
        type="range"
        min="50"
        max="100"
        value={value}
        onChange={handleChange}
      />
      <p>Value: {value}</p>
    </div>
  );
}

export default Slider;