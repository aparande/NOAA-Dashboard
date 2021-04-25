import { Marker, Popup, Polyline, Tooltip } from 'react-leaflet';
import { interval_search, dist, mean, interpolate } from '../utils';
import BuoyPopup from './buoy_popup';
import TracePopup from './trace_popup';
import React, { useEffect, useState } from 'react';
import { get_tol } from '../queries';
import { buoyIcon } from '../constants';

const Buoy = (props) => {
  const [position, setPosition] = useState([ 0, 0 ]);
  const [tolData, setTOLData] = useState(null);
  const [renderMarker, setRenderMarker] = useState(false);
  const [toolTipOpen, setToolTipOpen] = useState(false);

  useEffect(() => {
    let interval = interval_search(props.positions, (elem) => {
      if (elem.timestamp === props.currTime) return 0;
      else if (elem.timestamp < props.currTime) return 1;
      else if (elem.timestamp > props.currTime) return -1;
    });

    /**
     * 1. curr_time < interval_start < interval_end: Display if interval_start < curr_time + step
     * 2. interval_start < curr_time < interval_end: Interpolate
     * 3. interval_start < curr_time: Display if curr_time < interval_start + step
     */

     if (interval[1]) {
      const diff = props.currTime - interval[0].timestamp;
      const inter_len = interval[1].timestamp - interval[0].timestamp;

      if (diff <= 0) {
        setPosition([ interval[0].latitude, interval[0].longitude ]);
        setRenderMarker(interval[0].timestamp <= props.currTime + props.step);
      } else {
        const lat = interpolate(interval[0].latitude,  interval[1].latitude,  diff / inter_len);
        const lon = interpolate(interval[0].longitude, interval[1].longitude, diff / inter_len);
        setPosition([ lat, lon ]);
        setRenderMarker(true);
      }
    } else {
      setPosition([ interval[0].latitude, interval[0].longitude ]);
      setRenderMarker( props.currTime <= interval[0] + props.step )
    }

  }, [props.positions, props.currTime, props.step]);

  const loadTOLData = async () => {
    console.log("Loading TOL data")
    let data = await get_tol(props.currTime, props.step, props.drift_num);
    if (Object.keys(data).length > 0) {
      data = mean(data);
      // console.log(data);
      delete data.timestamp;
      data = Object.keys(data).map(key => {return { x: parseInt(key), y: data[key] }});
      data.sort((a, b) => a.x - b.x);
      console.log(data);
      setTOLData(data);
    } else {
      setTOLData(null);
    }
  }

  const traceEventHandlers = {
    click(e) {
      // TODO: this doesn't cover interpolated points, but its good enough for now.
      const closest = props.positions.reduce((prev, curr) => {
        const prevDist = dist([prev.latitude, prev.longitude], [e.latlng.lat, e.latlng.lng]);
        const currDist = dist([curr.latitude, curr.longitude], [e.latlng.lat, e.latlng.lng]);
        return (prevDist < currDist) ? prev : curr;
      });

      console.log(closest, e.latlng);
      props.setCurrTime(closest.timestamp);

      return null;
    }
  }

  return(
    <div>
      { renderMarker && (
        <Marker position={ position } icon={ buoyIcon }>
          <Popup onOpen = {loadTOLData} >
            <p className="driftPrint" >
              Drift {props.drift_num}
            </p>
            <BuoyPopup data={ tolData }/>
          </Popup>
        </Marker>)
      }
      <Polyline positions={props.positions.map((pt) => [ pt.latitude, pt.longitude ])}
              eventHandlers={traceEventHandlers}
              pathOptions={{ weight: 3 }}>
        <Tooltip onOpen={() => setToolTipOpen(true)} sticky>
          <TracePopup minTime={props.minTime} maxTime={props.maxTime} drift_num={props.drift_num}
                      step={props.step} isOpen={toolTipOpen} />
        </Tooltip>

      </Polyline>
    </div>
    );
}

export default Buoy;
