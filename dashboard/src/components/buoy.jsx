import { Marker, Popup, Polyline } from 'react-leaflet';
import { interval_search, dist, interpolate } from '../utils';
import BuoyPopup from './buoy_popup';
import TracePopup from './trace_popup';
import React, { useEffect, useState, createRef } from 'react';
import { buoyIcon } from '../constants';
import { get_buoy_trace } from '../queries.js';

import analytics from '../analytics';

const Buoy = (props) => {
  const [position, setPosition] = useState([ 0, 0 ]);
  const [renderMarker, setRenderMarker] = useState(false);
  const [toolTipOpen, setToolTipOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
	const [renderTrace, setRenderTrace] = useState(false);
  const [hoverTime, setHoverTime] = useState(null);
	const [positions, setPositions] = useState([]);

	const tooltipRef = createRef();
  const traceRef = createRef();

  useEffect(() => {
    async function fetchData() {
      const data = await get_buoy_trace(props.drift_id);
			console.log(data);
			data.forEach((pt) => {
				pt.timestamp = Date.parse(pt.timestamp) / 1000;
			  pt.longitude = parseFloat(pt.longitude);
				pt.latitude = parseFloat(pt.latitude);
			});
      setPositions(data);
			setRenderTrace(true);
    }
    fetchData();
  }, [props.drift_id])


  useEffect(() => {
		if (positions.length === 0) { return; }
    let interval = interval_search(positions, (elem) => {
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

  }, [positions, props.currTime, props.step]);

  const traceEventHandlers = {
    click(e) {
      // TODO: this doesn't cover interpolated points, but its good enough for now.
      const closest = positions.reduce((prev, curr) => {
        const prevDist = dist([prev.latitude, prev.longitude], [e.latlng.lat, e.latlng.lng]);
        const currDist = dist([curr.latitude, curr.longitude], [e.latlng.lat, e.latlng.lng]);
        return (prevDist < currDist) ? prev : curr;
      });

      // console.log(closest, e.latlng);
      props.setCurrTime(closest.timestamp);
    },
    mouseover(e) {
      if (traceRef.current) {
        // TODO: there is a weird issue where it doesn't actually open up at the latlng position
        traceRef.current.openPopup(e.latlng);
        if (tooltipRef.current) tooltipRef.current.setLatLng(e.latlng);

        analytics.BBPopup(props.drift_name);
      }
    },
		mousemove(e) {
      const closest = positions.reduce((prev, curr) => {
        const prevDist = dist([prev.latitude, prev.longitude], [e.latlng.lat, e.latlng.lng]);
        const currDist = dist([curr.latitude, curr.longitude], [e.latlng.lat, e.latlng.lng]);
        return (prevDist < currDist) ? prev : curr;
      });

      // console.log(closest, e.latlng);
      setHoverTime(closest.timestamp);

			if (tooltipRef.current) tooltipRef.current.setLatLng(e.latlng);
		},
    mouseout(e) {
      if (traceRef.current) traceRef.current.closePopup();
    }
	}

  return(
    <div>
      { renderMarker && (
        <Marker position={ position } icon={ buoyIcon }>
          <Popup onOpen = { () => {setPopupOpen(true); analytics.TOLPopup(props.drift_name)} } onClose={ () => setToolTipOpen(false) } >
            <p className="driftPrint" >
              {props.drift_name} TOL
            </p>
            <BuoyPopup isOpen={popupOpen} currTime={props.currTime} step={props.step} drift_id={props.drift_id}/>
          </Popup>
        </Marker>)
      }
		{ renderTrace && (<Polyline positions={positions.map((pt) => [ pt.latitude, pt.longitude ])}
              eventHandlers={traceEventHandlers}
              pathOptions={{ weight: 5 }} ref={traceRef}
              color='#212428'>
        <Popup onOpen={() => { setToolTipOpen(true) } } onClose={() => { setToolTipOpen(false) }} ref={tooltipRef} closeOnClick={false}>
          <TracePopup minTime={props.minTime} maxTime={props.maxTime} drift_name={props.drift_name} drift_id={ props.drift_id }
                      step={props.step} isOpen={toolTipOpen} currTime={hoverTime} />
        </Popup>
      </Polyline>)
		}
    </div>
    );
}

export default Buoy;
