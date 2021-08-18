import React, { useState, useEffect } from 'react';
import 'react-vis/dist/style.css';
import { XYPlot, LineSeries, VerticalBarSeries, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, ChartLabel } from 'react-vis';
import Loader from 'react-loader-spinner';
import { usePromiseTracker, trackPromise } from 'react-promise-tracker';
import { get_tol } from '../queries';
import Dropdown from "./Dropdown";

const BuoyPopup = (props) => {
  const [chartType, setChartType] = useState("line");
  const [statistic, setStatistic] = useState("median");
  const [tolData, setTOLData] = useState(null);

  const { promiseInProgress } = usePromiseTracker({ area: "buoy-popup-area" });

  useEffect(() => {
    const fetchData = async () => {
      console.log("Loading TOL data")
      let data = await get_tol(props.currTime, props.step, props.drift_id, statistic);
      if (data.length > 0) {
        data = data.map(a => { return { x: parseInt(a.xlabel), y: a.avg }});
        data.sort((a, b) => a.x - b.x);
        setTOLData(data);
      } else {
        setTOLData(null);
      }
    }
    if (props.isOpen) trackPromise(fetchData(), "buoy-popup-area");
  }, [props.currTime, props.step, props.drift_id, props.isOpen, statistic])


  function lineSeries() {
    return (
      <XYPlot height={window.innerHeight / 2} width={window.innerWidth / 2.5} xType="log" margin={{ bottom: 75, left: 50 }}>
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
        <LineSeries data={tolData} />
      </XYPlot>
    )
  }

  function barchart() {
    return (
      <XYPlot height={window.innerHeight / 2} width={window.innerWidth / 2.5} xType="log" margin={{ bottom: 75, left: 50 }}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis
          tickFormat={function tickFormat(d) { return d.toString().concat(" Hz") }}
          tickLabelAngle={-75}
        />
        <YAxis tickFormat={function tickFormat(d) { return d.toFixed().toString().concat(" dB") }} />
        <VerticalBarSeries data={tolData} />
      </XYPlot>
    )
  }

  if (promiseInProgress) {
    return <Loader type="ThreeDots" color="#212529" visible />
  } else if (tolData === null || tolData === undefined) {
    return <p>Missing data for buoy. It will be available soon</p>
  } else {
    console.log("Showing buoy popup");
    return (
      <div>
        { chartType === "line" && lineSeries()}
        { chartType === "bar" && barchart()}
        <Dropdown onSelect={setChartType} options={{ line: "Line Chart", bar: "Bar Chart" }}/>
        <Dropdown onSelect={setStatistic} options={{ median: "Median", mean: "Mean" }} className="ml-2" />
      </div>
    )
  }
}

export default BuoyPopup;
