import React, { useEffect, useState } from 'react';
import { get_all_traces, get_oil_gas_platforms } from '../queries';
import { MapContainer, TileLayer, ImageOverlay, useMap} from 'react-leaflet';
import Buoy from './buoy';
import Labeled from './Labeled';
import OilPlatform from './oil_platform';
import sea_lion_habitat from '../data/sea-lion-habitat.json'
import HeatLayer from './heat_layer';

// This is the API Key from MapBox documentation. Might as well just use it for now
// mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

const Map = () => {
  const [lng, setLng] = useState(-119.4179);
  const [lat, setLat] = useState(36.7783);
  const [zoom, setZoom] = useState(6);
  const [traces, setTraces] = useState({});
  const [currTime, setCurrTime] = useState(1535623127);
  const [platformLocs, setPlatformLocs] = useState([]);
  const [step, setStep] = useState(365);

  // Effect to load the data when the app first loads
  useEffect(() => {
    async function fetchData() {
      const initial_trace = await get_all_traces(currTime, null, 100);
      setTraces(initial_trace);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const data = await get_oil_gas_platforms();
      console.log(data);
      setPlatformLocs(data);
    }
    fetchData();
  }, [])

  return (
    <div>
      <MapContainer center={[lat, lng]} zoom={zoom} style={{ width: '100%', height: '100vh'}} >
        <TileLayer
          attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Can tweak the coordinates to make it overlap better */}
        <HeatLayer data={ sea_lion_habitat.map(x => [x.latitude, x.longitude, x.val]) } />
        {
          Object.keys(traces).map((key, idx) =>
          <Buoy currTime={ currTime } drift_num={ key }
                positions={ traces[key] } key={ idx }
                setCurrTime = { setCurrTime } />)
        }
        { platformLocs.map((b, idx) => <OilPlatform platform={b} key={"platform" + idx} />) }
      </MapContainer>
      <div>
        <div className="sliderwrapper">
          <Labeled className="slider" step={ step } minTime={ minTime } maxTime={ maxTime } currTime={ currTime } setCurrTime = { setCurrTime } />
        </div>
        <div className="buttons">
          <button className="button" onClick={() => setStep(1)}>Day</button>
          <button className="button" onClick={() => setStep(7)}>Week</button>
          <button className="button" onClick={() => setStep(30)}>Month</button>
        </div>
      </div>
    </div>
  )};

export default Map;
