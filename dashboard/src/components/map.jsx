import React, { useRef, useEffect, useState } from 'react';
import { get_all_traces, get_oil_gas_platforms } from '../queries';
import { binary_search, to_geojson_point, to_geojson_line} from '../utils';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
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
  const [buoyLocs, setbuoyLocs] = useState([]);
  const [platformLocs, setPlatformLocs] = useState([]);

  // Effect to load the data when the app first loads
  useEffect(() => {
    async function fetchData() {
      const initial_trace = await get_all_traces(currTime);
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

  // useEffect(() => {
  //   if (!mapLoaded) return;

  //   Object.keys(traces).forEach((drift_num) => {
  //     let points = to_geojson_line(traces[drift_num]);
  //     if (lineLayerInit) {
  //       if (map == null || map === undefined) return;
  //       const source = map.getSource(`buoy_route_${drift_num}`);
  //       if (source === undefined) return;

  //       source.setData(points);
  //     } else {
  //       if (map == null || map === undefined) return;

  //       map.addSource(`buoy_route_${drift_num}`, { type: 'geojson', data: points });
  //       map.addLayer({
  //         'id': `buoy_route_${drift_num}`,
  //         'type': 'line',
  //         'source': `buoy_route_${drift_num}`,
  //         'layout': {
  //           'line-join': 'round',
  //           'line-cap': 'round'
  //         },
  //         'paint': {
  //           'line-color': '#F00',
  //           'line-width': 8
  //         }
  //       });

  //       setLineLayerInit(true);
  //     }
  //   });
  // }, [traces, mapLoaded])

  // Effect to put the points on the map which are at most 2 minutes after the current time
  // Reloads every time mapLoaded, traces, or currTime changes value

  useEffect(() => {
    // Search for the closest timestamp point in the traces using binary search
    let points = Object.keys(traces).map((drift_num) => {
      return binary_search(traces[drift_num], (elem) => {
        if (elem.timestamp === currTime) return 0;
        else if (elem.timestamp < currTime) return 1;
        else if (elem.timestamp > currTime) return -1;
      });
    });
    console.log(points);

    // Filter to points which are up to 2 minutes after the current time
    points = points.filter((elem) => {
      let diff = elem.timestamp - currTime;
      return diff >= 0 && elem.timestamp < currTime + 120;
    })

    setbuoyLocs(points.map((pt) => {
        return {loc: [pt.latitude, pt.longitude], drift_num: pt.drift_num}}
      ));
  }, [traces, currTime]);

  return (
    <MapContainer center={[lat, lng]} zoom={zoom} style={{ width: '100%', height: '100vh'}} >
      <TileLayer
        attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      { buoyLocs.map((b, idx) => <Buoy position={b.loc} drift_num={b.drift_num} key={idx} />) }
      { platformLocs.map((b, idx) => <OilPlatform platform={b} key={"platform" + idx} />) }
      </MapContainer>
  )};

export default Map;