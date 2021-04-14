import React, { useEffect, useState } from 'react';
import { get_all_traces, get_oil_gas_platforms } from '../queries';
import { MapContainer, TileLayer} from 'react-leaflet';
import Buoy from './buoy';
import OilPlatform from './oil_platform';

// This is the API Key from MapBox documentation. Might as well just use it for now
// mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

const Map = () => {
  const [lng, setLng] = useState(-119.4179);
  const [lat, setLat] = useState(36.7783);
  const [zoom, setZoom] = useState(6);
  const [traces, setTraces] = useState({});
  const [currTime, setCurrTime] = useState(1535623127);
  const [platformLocs, setPlatformLocs] = useState([]);

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
    <MapContainer center={[lat, lng]} zoom={zoom} style={{ width: '100%', height: '100vh'}} >
      <TileLayer
        attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      { 
        Object.keys(traces).map((key, idx) => 
        <Buoy currTime={ currTime } drift_num={ key } 
              positions={ traces[key] } key={ idx } 
              setCurrTime = { setCurrTime } />)
      }
      { platformLocs.map((b, idx) => <OilPlatform platform={b} key={"platform" + idx} />) }
      </MapContainer>
  )};

export default Map;