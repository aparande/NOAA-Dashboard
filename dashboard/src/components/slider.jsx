import React, { useEffect, useState } from 'react';
import { Range, getTrackBackground } from 'react-range';

const Slider = (props) => {
  const [values, setValues] = useState([ props.currTime ]);
  const STEP = props.step;
  const MIN = props.minTime;
  const MAX = props.maxTime;

  useEffect(() => {
    setValues([ props.currTime ]);
  }, [props.currTime])

  return (
    <div className="slider">
      <Range values={values} step={STEP} min={MIN} max={MAX}
        rtl={props.rtl}
        onChange={(values) => props.setCurrTime(values[0])}
        /* onFinalChange={(values) => props.setCurrTime(values[0])} */
        renderTrack={({ props, children }) => (
          <div className="slider-inner" onMouseDown={props.onMouseDown} onTouchStart={props.onTouchStart} style={props.style}>
            <div className="slider-track" ref={props.ref}
              style={{ background: getTrackBackground({ values, colors: ['#229FAD', '#ffffff'], min: MIN, max: MAX }) }}>
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div className="slider-thumb" {...props} style={{ ...props.style }} >
            {/*
            // Can uncomment this if we want something to show up above the slider
              <div className="slider-popup">
              {Math.round((values[0].toFixed(1) - MIN) / STEP)}
            </div> */}
            <div className="slider-marker"
              style={{ backgroundColor: isDragged ? '#229FAD' : '#ffffff' }}
            />
          </div>
        )}
      />
      <div className="date">
        { /* TODO: There is a weird flickering effect with the slider */ }
        { new Date(values[0].toFixed(1) * 1000).toLocaleString() }
      </div>
    </div>
  );
};

export default Slider;
