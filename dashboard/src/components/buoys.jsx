import { Marker, Popup } from 'react-leaflet';

const Buoy = (props) => {
    return(
        <Marker position={props.position}>
          <Popup>Drift Number: {props.drift_num}</Popup>
        </Marker>
      );
}

export default Buoy;
