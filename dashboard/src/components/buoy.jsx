import { Marker, Popup, Polyline } from 'react-leaflet';
import { binary_search, dist} from '../utils';

const Buoy = (props) => {
  let point = binary_search(props.positions, (elem) => {
    if (elem.timestamp === props.currTime) return 0;
    else if (elem.timestamp < props.currTime) return 1;
    else if (elem.timestamp > props.currTime) return -1;
  });

  const diff = point.timestamp - props.currTime;

  return(
    <div>
      { (diff <= 0 && point.timestamp < props.currTime + 120 ) && (
        <Marker position={ [point.latitude, point.longitude] }>
          <Popup>Drift Number: {props.drift_num}</Popup>
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
