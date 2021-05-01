import { Marker, Tooltip } from 'react-leaflet';
import { SPECIES_DETECTION_KEYS, SPECIES_DETECTION_COLORS } from '../constants';
import L from 'leaflet';

const Detection = (props) => {
  const position = [props.detection.latitude, props.detection.longitude];

  const icon = new L.DivIcon({
    className: 'detection-icon',
    html: `<div style="background-color: ${SPECIES_DETECTION_COLORS[props.detection.species]}; width: 12px; height:12px; border-radius: 6px"></div>`
  });

  return(
      <Marker position={ position } icon={ icon } >
        <Tooltip>
         <p className="driftPrint">{SPECIES_DETECTION_KEYS[props.detection.species]}</p>
         <p className="oilDescription"><strong>Drift Number:</strong> {props.detection.drift_num}</p>
         <p className="oilDescription bold"><strong>Time:</strong> {(new Date(props.detection.timestamp * 1000)).toLocaleString()}</p>
         <p className="oilDescription"><strong>Number of Clicks:</strong> {props.detection.nClicks}</p>
        </Tooltip>
      </Marker>
    );
}

export default Detection;
