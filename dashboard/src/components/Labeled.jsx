import React, { useEffect, useState } from 'react';
import { Range, getTrackBackground } from 'react-range';

const Labeled = (props) => {
  const [values, setValues] = useState([props.minTime]);
  const STEP = props.step;
  const MIN = props.minTime;
  const MAX = props.maxTime;

  function calculateDay(utcSeconds) {
    var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(utcSeconds);
    return d
  }

  return (
    <div className="slider">
      <Range values={values} step={STEP} min={MIN} max={MAX}
        rtl={props.rtl}
        onChange={(values) => setValues(values)}
        onFinalChange={(values) => props.setCurrTime(values[0])}
        renderTrack={({ props, children }) => (
          <div className="slider-inner" onMouseDown={props.onMouseDown} onTouchStart={props.onTouchStart} style={props.style}>
            <div className="slider-track" ref={props.ref}
              style={{ background: getTrackBackground({ values, colors: ['#548BF4', '#ccc'], min: MIN, max: MAX }) }}>
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div className="slider-thumb" {...props} style={{ ...props.style }} >
            <div className="slider-popup">
              {Math.round((values[0].toFixed(1) - MIN) / STEP)}
            </div>
            <div className="slider-marker"
              style={{ backgroundColor: isDragged ? '#548BF4' : '#CCC' }}
            />
          </div>
        )}
      />
      <div className="date">
        {calculateDay(values[0].toFixed(1)).toLocaleString()}
      </div>
    </div>
  );
};

export default Labeled;
