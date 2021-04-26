import { Marker, Popup } from 'react-leaflet';
import { SPECIES_DETECTION_KEYS, whaleIcon } from '../constants';

const Detection = (props) => {
  const position = [props.detection.latitude, props.detection.longitude];

  return(
      <Marker position={position} icon={ whaleIcon }>
        <Popup>
         <p>Time: {(new Date(props.detection.timestamp * 1000)).toLocaleString()}</p>
         <p>Drift Number: {props.detection.drift_num}</p>
         <p>Species: {SPECIES_DETECTION_KEYS[props.detection.species]}</p>
         <p>Number of Clicks: {props.detection.nClicks}</p>
        </Popup>
      </Marker>
    );
}

export default Detection;
