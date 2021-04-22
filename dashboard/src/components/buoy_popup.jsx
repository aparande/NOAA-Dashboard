import React, { useState } from 'react';
import 'react-vis/dist/style.css';
import {XYPlot, LineSeries, VerticalBarSeries, XAxis, YAxis, VerticalGridLines, HorizontalGridLines} from 'react-vis';

const BuoyPopup = (props) => {
  const [chartType, setChartType] = useState("line");

  function lineSeries() {
    return (
      <XYPlot height={300} width={300}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <LineSeries data={props.data} />
      </XYPlot>
    )
  }

  function barchart() {
    return (
      <XYPlot height={300} width={300}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <VerticalBarSeries data={props.data} />
      </XYPlot>
    )
  }

  const data = props.data;
  console.log(data);

  if (data === null || data === undefined) {
    return <p>No Data Found</p>
  } else {
    return (
      <div>
        { chartType === "line" && lineSeries() }
        { chartType === "bar"  && barchart() }
        <select name="chart" onChange={(event) => setChartType(event.target.value)}>
          <option value="line">Line Chart</option>
          <option value="bar">Bar Chart</option>
        </select>
      </div>
    )
  }
}

export default BuoyPopup;
