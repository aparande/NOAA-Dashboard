import { Marker, Popup, Polyline } from 'react-leaflet';
import { interval_search, dist} from '../utils';
import BuoyPopup from './buoy_popup'
import React, { useEffect, useState } from 'react';

const Buoy = (props) => {
  const [position, setPosition] = useState([ 0, 0 ]);
  const [renderMarker, setRenderMarker] = useState(false);

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

  return(
    <div>
      { renderMarker && (
        <Marker position={ position }>
          <Popup>Drift Number: {props.drift_num}<BuoyPopup/></Popup>
        </Marker>)
      }
      <Polyline positions={props.positions.map((pt) => [ pt.latitude, pt.longitude ])}
        eventHandlers={{
          click: (e) => {
            const closest = props.positions.reduce((prev, curr) => {
              return dist([prev.latitude, prev.longitude], e.latlng) < dist([curr.latitude, curr.longitude], e.latlng) ? prev : curr;
            });

            console.log(closest);
            props.setCurrTime(closest.timestamp);

            return null
          }
        }} />
    </div>
    );
}

export default Buoy;
