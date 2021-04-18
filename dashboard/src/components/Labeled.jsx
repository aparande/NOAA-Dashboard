import React, { useEffect, useState } from 'react';
import { Range, getTrackBackground } from 'react-range';

const Labeled = (props) => {
  const [values, setValues] = useState([0]);
  const STEP = props.step;
  const MIN = props.minTime;
  const MAX = props.maxTime+120;

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
              {values[0].toFixed(1)}
            </div>
            <div className="slider-marker"
              style={{ backgroundColor: isDragged ? '#548BF4' : '#CCC' }}
            />
          </div>
        )}
      />
    </div>
  );
};

export default Labeled;
