import React, { useState } from 'react';
import 'react-vis/dist/style.css';
import { XYPlot, LineSeries, VerticalBarSeries, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, ChartLabel } from 'react-vis';
import Loader from 'react-loader-spinner';

const BuoyPopup = (props) => {
  const [chartType, setChartType] = useState("line");

  function lineSeries() {
    return (
      <XYPlot height={300} width={800} xType="log" margin={{ bottom: 75, left: 50 }}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis
          tickFormat={function tickFormat(d) { return d.toString().concat(" Hz") }}
          tickLabelAngle={-90}
        /*tickTotal={2.9}*/ // Display only three labels
        />
        <YAxis
          tickFormat={function tickFormat(d) { return d.toFixed().toString().concat(" dB") }}
        />
        <LineSeries data={props.data} />
      </XYPlot>
    )
  }

  function barchart() {
    return (
      <XYPlot height={300} width={800} xType="log" margin={{ bottom: 75, left: 50 }}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis
          tickFormat={function tickFormat(d) { return d.toString().concat(" Hz") }}
          tickLabelAngle={-75}
        />
        <YAxis tickFormat={function tickFormat(d) { return d.toFixed().toString().concat(" dB") }} />
        <VerticalBarSeries data={props.data} />
      </XYPlot>
    )
  }

  if (props.loading) {
    return <Loader type="ThreeDots" color="#212529" visible />
  } else if (props.data === null || props.data === undefined) {
    return <p>Missing data for buoy. It will be available soon</p>
  } else {
    console.log("Showing buoy popup");
    return (
      <div>
        { chartType === "line" && lineSeries()}
        { chartType === "bar" && barchart()}
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


// Code to display y-axis label
/* <ChartLabel
  text="Sound Level (dB)"
  className="alt-y-label"
  includeMargin={false}
  xPercent={-0.08}
  yPercent={0.4}
  style={{
    transform: 'rotate(-90)',
    textAnchor: 'end'
  }} /> */

export default BuoyPopup;
