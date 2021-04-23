import { Marker, Popup, Polyline, Tooltip } from 'react-leaflet';
import { interval_search, dist, mean} from '../utils';
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

    // TODO: this is still a little buggy (when you click the line)
    const diff = interval[0].timestamp - props.currTime;

    let inter_len = 0;
    if (interval[1]) {
      inter_len = interval[1].timestamp - interval[0].timestamp;
      if (diff <= 0) {
        // Start of the interval is before the current time.
        setPosition([interval[0].latitude + (interval[1].latitude - interval[0].latitude) * (-1 * diff) / inter_len,
                        interval[0].longitude + (interval[1].longitude - interval[0].longitude) * (-1 * diff) / inter_len]);
      } else {
        // Start of the interval is after the current time.
        setPosition([interval[0].latitude + (interval[1].latitude - interval[0].latitude) * diff / inter_len,
                        interval[0].longitude + (interval[1].longitude - interval[0].longitude) * diff / inter_len]);
      }
      setRenderMarker(diff <= inter_len);
    } else {
      setPosition([interval[0].latitude, interval[0].longitude])
      setRenderMarker(diff <=0 && interval[0].timestamp < props.currTime + props.step);
    }

  }, [props.positions, props.currTime, props.step])

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
    click: (e) => {
      const closest = props.positions.reduce((prev, curr) => {
        return dist([prev.latitude, prev.longitude], e.latlng) < dist([curr.latitude, curr.longitude], e.latlng) ? prev : curr;
      });

      console.log(closest);
      props.setCurrTime(closest.timestamp);

      return null
    }
  };

  return(
    <div>
      { renderMarker && (
        <Marker position={ position } icon={ buoyIcon }>
          <Popup onOpen = {loadTOLData} >
            Drift Number: {props.drift_num}
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
