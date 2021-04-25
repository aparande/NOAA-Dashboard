import React, { useState, useEffect } from 'react';
import 'react-vis/dist/style.css';
import {XYPlot, LineSeries, VerticalBarSeries, XAxis, YAxis, VerticalGridLines, HorizontalGridLines} from 'react-vis';
import { get_bb } from '../queries';

const TracePopup = (props) => {
  const [bbData, setBBData] = useState(null);

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
    if (props.isOpen) fetchData();
  }, [props.isOpen, props.minTime, props.maxTime, props.step, props.drift_num]);

  // return <p>No Data Found</p>
  if (bbData === null || bbData === undefined) {
    return <p>No Data Found</p>
  } else {
    return (
      <XYPlot height={300} width={500}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <LineSeries data={bbData} />
      </XYPlot>
    )
  }
}

export default TracePopup;