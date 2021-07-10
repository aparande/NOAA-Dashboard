import React, { useEffect, useState } from 'react';
import { Range, getTrackBackground } from 'react-range';
import styles from './slider.module.css';

const Slider = (props) => {
  const [values, setValues] = useState([ props.currTime ]);
  const STEP = props.step;
  const MIN = props.minTime;
  const MAX = props.maxTime;

  useEffect(() => {
    setValues([ props.currTime ]);
  }, [props.currTime])

  return (
    <div className={styles.container}>
      <Range values={values} step={STEP} min={MIN} max={MAX}
        rtl={props.rtl}
        onChange={(values) => props.setCurrTime(values[0])}
        /* onFinalChange={(values) => props.setCurrTime(values[0])} */
        renderTrack={({ props, children }) => (
          <div className={styles.inner} onMouseDown={props.onMouseDown} onTouchStart={props.onTouchStart} style={props.style}>
            <div className={styles.track} ref={props.ref}
              style={{ background: getTrackBackground({ values, colors: ['#229FAD', '#ffffff'], min: MIN, max: MAX }) }}>
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div className={styles.thumb} {...props} style={{ ...props.style }} >
            {/*
            // Can uncomment this if we want something to show up above the slider
              <div className="slider-popup">
              {Math.round((values[0].toFixed(1) - MIN) / STEP)}
            </div> */}
            <div className={styles.marker}
              style={{ backgroundColor: isDragged ? '#229FAD' : '#ffffff' }}
            />
          </div>
        )}
      />
      <div className={styles.date}>
        { new Date(values[0].toFixed(1) * 1000).toLocaleString() }
      </div>
    </div>
  );
};

export default Slider;
