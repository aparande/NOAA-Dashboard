import { Marker, Popup } from 'react-leaflet';
import { oilIcon } from '../constants';

const OilPlatform = (props) => {
  const position = [props.platform.LATITUDE, props.platform.LONGITUDE];
  const name = props.platform.NAME;
  const description = props.platform.NAICS_DESC;
  return(
      <Marker position={position} icon={ oilIcon }>
        <Popup>
         <p className="driftPrint">{name}</p>
         <p className="oilDescription">{description.toLowerCase()
                                                   .split(' ')
                                                   .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                                                   .join(' ')}
         </p>
        </Popup>
      </Marker>
    );
}

export default OilPlatform;
