import React, { useState } from 'react';
import 'react-vis/dist/style.css';
import {XYPlot, LineSeries, VerticalBarSeries, XAxis, YAxis, VerticalGridLines, HorizontalGridLines} from 'react-vis';

const BuoyPopup = (props) => {
  const [chartType, setChartType] = useState("line");

  function lineSeries() {
    return (
      <XYPlot height={300} width={300} yType="log">
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis
          tickFormat={function tickFormat(d){return d.toString().concat(" Hz")}}
          tickLabelAngle={-15}
        />
        <YAxis title="Sound Level (dB)" position="start"/>
        <LineSeries data={props.data} />
      </XYPlot>
    )
  }

  function barchart() {
    return (
      <XYPlot height={300} width={300}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis
          tickFormat={function tickFormat(d){return d.toString().concat(" Hz")}}
          tickLabelAngle={-15}
        />
        <YAxis title="Sound Level (dB)" position="start"/>
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
        <span className="custom-dropdown custom-dropdown--white">
          <select className="custom-dropdown__select custom-dropdown__select--white" onChange={(event) => setChartType(event.target.value)}>
            <option value="line">Line Chart</option>
            <option value="bar">Bar Chart</option>
          </select>
        </span>
      </div>
    )
  }
}

export default BuoyPopup;
