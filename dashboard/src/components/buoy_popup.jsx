import React, { useEffect, useState, Component } from 'react';
import 'react-vis/dist/style.css';
import {XYPlot, LineSeries, VerticalBarSeries, XAxis, YAxis, VerticalGridLines, HorizontalGridLines} from 'react-vis';

const BuoyPopup = (props) => {
  const [chartType, setChartType] = useState("line");

  const data = [
    {x: 0, y: 8},
    {x: 1, y: 5},
    {x: 2, y: 4},
    {x: 3, y: 9},
    {x: 4, y: 1},
    {x: 5, y: 7},
    {x: 6, y: 6},
    {x: 7, y: 3},
    {x: 8, y: 2},
    {x: 9, y: 0}
  ];

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

  return (
    <div>
      { (chartType === "line" && data.length !== 0) && (lineSeries()) }
      { (chartType === "bar"  && data.length !== 0) && (barchart()) }
      <select name="chart" onChange={(event) => setChartType(event.target.value)}>
        <option value="line">Line Chart</option>
        <option value="bar">Bar Chart</option>
      </select>
    </div>
  );
}

export default BuoyPopup;
