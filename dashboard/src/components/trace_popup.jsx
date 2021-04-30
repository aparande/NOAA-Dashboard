import React, { useState, useEffect } from 'react';
import 'react-vis/dist/style.css';
import {XYPlot, LineSeries, Crosshair, XAxis, YAxis, VerticalGridLines, HorizontalGridLines} from 'react-vis';
import Loader from 'react-loader-spinner';
import { usePromiseTracker, trackPromise } from 'react-promise-tracker';

import { get_bb } from '../queries';

const TracePopup = (props) => {
  const [bbData, setBBData] = useState(null);
  const [crosshairPoint, setCrosshairPoint] = useState([]);

  const { promiseInProgress } = usePromiseTracker({ area: "trace-popup-area" });

  useEffect(() => {
    const fetchData = async () => {
      console.log("Loading BB data");
      let data = await get_bb(props.minTime, props.maxTime, props.drift_num, props.step);
      if (Object.keys(data).length > 0) {
        data = Object.keys(data).map(timestamp => {return { x: timestamp, y: data[timestamp]["20-24000 Hz"] }});
        data.sort((a, b) => a.x - b.x);
        setBBData(data);
      } else {
        setBBData(null);
      }
    }
    if (props.isOpen) trackPromise(fetchData(), "trace-popup-area");
  }, [props.isOpen, props.minTime, props.maxTime, props.step, props.drift_num]);

  useEffect(() => {
    if (bbData === null || bbData === undefined || !props.isOpen || props.currTime === null || props.currTime === undefined) {
			setCrosshairPoint([]);
			return;
		}

    for (let i = 0; i < bbData.length - 1; i++) {
      if (parseInt(bbData[i].x) > props.currTime) continue;
      if (parseInt(bbData[i].x) <= props.currTime && parseInt(bbData[i + 1].x) >= props.currTime) {
        setCrosshairPoint([bbData[i]]);
        return;
      }
    }
  }, [bbData, props.currTime, props.isOpen]);

  if (promiseInProgress) {
    return <Loader type="ThreeDots" color="#212529" visible/>
  } else if (bbData === null || bbData === undefined) {
    return <p>Missing data for buoy. It will be availble soon</p>
  } else {
    return (
      <div>
      <p className="driftPrint">
      Soundlevel Timeseries Data (dB)
      </p>
      <XYPlot height={300} width={500} yType="log" margin={{bottom: 60}}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis
          orientation="bottom"
          tickFormat={function tickFormat(d){return new Date(d * 1000).toLocaleDateString()}}
          tickLabelAngle={-46} />
        <YAxis/>
        <LineSeries data={bbData} /> 
			  <Crosshair style={{ line: {background: '#212428', width: '3px' }}} 
                  values={crosshairPoint} itemsFormat={(values) => values.map((pt) => {
                    return { title: "BB", value: `${pt.y.toFixed(2)} dB` }
                    })
                  } titleFormat={(values) => { return  { title: "Time", value: (new Date(values[0].x * 1000)).toLocaleString() }}} />
				
      </XYPlot>
      </div>
    )
  }
};

export default TracePopup;
