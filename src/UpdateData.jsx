import React, { useState } from 'react';

function UpdateData({ setupdate }) {
  const [label, setLabel] = useState('');
  const [datahead, setDatahead] = useState('');
  const [detail, setDetail] = useState('');
  const [maxValue, setMaxValue] = useState(0);
  const [value, setValue] = useState(0);

  const handleSave = () => {
    // Perform save operation here, for example, send data to backend or update state
    console.log('Label:', label);
    console.log('Datahead:', datahead);
    console.log('Detail:', detail);
    console.log('Max Value:', maxValue);
    console.log('Value:', value);

    // Reset input fields after saving
    setLabel('');
    setDatahead('');
    setDetail('');
    setMaxValue(0);
    setValue(0);
  };

  return (
    <div className="modal">
      <h2>Modal</h2>
      <div>
        <label>Label:</label>
        <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} />
      </div>
      <div>
        <label>Datahead:</label>
        <input type="text" value={datahead} onChange={(e) => setDatahead(e.target.value)} />
      </div>
      <div>
        <label>Detail:</label>
        <input type="text" value={detail} onChange={(e) => setDetail(e.target.value)} />
      </div>
      <div>
        <label>Max Value:</label>
        <input type="number" value={maxValue} onChange={(e) => setMaxValue(parseInt(e.target.value))} />
      </div>
      <div>
        <label>Value:</label>
        <input type="number" value={value} onChange={(e) => setValue(parseInt(e.target.value))} />
      </div>
      <div>
        <button onClick={handleSave}>Save</button>
        <button onClick={setupdate(false)}>Go Back</button>
      </div>
    </div>
  );
}

export default UpdateData;
