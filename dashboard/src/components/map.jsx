import React, { useEffect, useState } from 'react';
import { get_oil_gas_platforms, get_visible_buoys } from '../queries';

import { MapContainer, TileLayer, LayersControl, FeatureGroup, LayerGroup, useMap} from 'react-leaflet';
import Buoy from './buoy';
import Labeled from './Labeled';
import Menu from './menu';
import OilPlatform from './oil_platform';
import HeatLayer from './heat_layer';
import Detection from './detection';

import traces from '../data/traces.json';
import detections from '../data/detections.json';
import sea_lion_habitat from '../data/sea-lion-habitat.json';
import ship_data from '../data/ship_density_monthly.json';

const minTime = Math.min(...Object.values(traces).map((timesteps) => Math.min(...timesteps.map((pt) => pt.timestamp))));
const maxTime = Math.max(...Object.values(traces).map((timesteps) => Math.max(...timesteps.map((pt) => pt.timestamp))));

console.log(minTime, maxTime);

const HOUR = 1 * 60 * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;
const MONTH = DAY * 30;

// This is the API Key from MapBox documentation. Might as well just use it for now
// mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

const Map = () => {
  const [lng, setLng] = useState(-119.4179);
  const [lat, setLat] = useState(36.7783);
  const [zoom, setZoom] = useState(6);
  const [currTime, setCurrTime] = useState(1535623127);
  const [platformLocs, setPlatformLocs] = useState([]);
  const [step, setStep] = useState(1*60*60);
  const [buoyNums, setBuoyNums] = useState(Object.keys(traces));
  const [visibleDetections, setVisibleDetections] = useState([]);
  const [shippingData, setShippingData] = useState(null);

  // to add a value in the menu, create a state and place its setter into the setLayers dictionary
  const [showBuoyLayer, setShowBuoyLayer] = useState(true);
  const [showOilLayer, setShowOilLayer] = useState(true);
  const [showShippingLayer, setShippingLayer] = useState(true);
  const [visibleHabitatName, setVisibileHabitatName] = useState("None");

  // layers inside the dictionary should be named how the layer appears in the menu, but without spaces
  const setLayers = {
    "Buoys": {
      "BuoyPath": setShowBuoyLayer
    },
    "Development": {
      "OilRigs": setShowOilLayer,
      "Ships": setShippingLayer
    },
    "Detections": {
    },
    "Habitats": {
      "selectedHabitat": setVisibileHabitatName
    }
  }
  // handler used to change state
  const toggleLayer = (menu_item, layer_item, state) => {
    console.log("Set layers", menu_item, layer_item, state);
    setLayers[menu_item][layer_item](state);
  };

  useEffect(() => {
    async function fetchData() {
      const data = await get_oil_gas_platforms();
      console.log(data);
      setPlatformLocs(data);
    }
    fetchData();
  }, [])

  useEffect(() => {
    async function fetchData() {
      const data = await get_visible_buoys(minTime);
      setBuoyNums(data);
    }
    fetchData();
  }, []);
  useEffect(() => {
    // console.log(detections);
    const visible = detections.filter((detection) => {
      if (!buoyNums.includes(detection.drift_num)) return false;
      return detection.timestamp >= currTime && detection.timestamp <= currTime + step;
    })
    // console.log(visible);
    setVisibleDetections(visible);
  }, [currTime, step, buoyNums])

  useEffect(() => {
    let time = "" + (Math.floor(currTime / MONTH) * MONTH) + ".0";
    if (ship_data[time] !== undefined && ship_data[time] !== null) {
      setShippingData(ship_data[time]);
    }
  }, [currTime])

  return (
    <>
    <MapContainer center={[lat, lng]} zoom={zoom} style={{ width: '100%', height: '100vh'}} >
      <TileLayer
        attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
      {/* BUOY GROUP */}
      {showBuoyLayer && <FeatureGroup>
              {
                buoyNums.map((key, idx) =>
                  <Buoy currTime={ currTime } drift_num={ key }
                    positions={ traces[key] } key={ idx } setCurrTime = { setCurrTime }
                    step={step} minTime={minTime} maxTime={maxTime}
                  />)
              }
      </FeatureGroup>}
      {/* DEVELOPMENT GROUP */}
      {showOilLayer && <FeatureGroup>
            { platformLocs.map((b, idx) => <OilPlatform platform={b} key={"platform" + idx} />) }
      { showShippingLayer && shippingData &&
        <HeatLayer data={ shippingData.map(x => [x.latitude, x.longitude, Math.log(x.size)]) }
                   gradient={{ 0.14 : "#CB94FF", 0.4: "#106DDB", 1: "#490092" }} />
      }
      </FeatureGroup>}
      {/* SPECIES GROUP */}
      <FeatureGroup>
            { visibleDetections.map((b, idx) => <Detection detection={b} key={"detection" + idx} />) }
      </FeatureGroup>
      {/* HABITAT GROUP */}
        {/* Can tweak the coordinates to make it overlap better */}
        {
          visibleHabitatName !== "None" &&
          <HeatLayer data={ sea_lion_habitat.map(x => [x.latitude, x.longitude, x.val]) }
                    gradient={{0.1: '#F4C75E', 0.3: '#FC6EB7', 0.75: '#910100'}} />
        }
      <Menu layers={toggleLayer}></Menu>
    </MapContainer>
    <div id="time-slider">
        <div className="sliderwrapper">
          <Labeled className="slider" step={ step } minTime={ minTime } maxTime={ maxTime } currTime={ currTime } setCurrTime = { setCurrTime } />
        </div>
        <div className="buttons">
          <button className="button" style={{ backgroundColor: (step === HOUR) ? '#229FAD' : '#212428' }} onClick={() => setStep(HOUR)}>Hour</button>
          <button className="button" style={{ backgroundColor: (step === DAY) ? '#229FAD' : '#212428' }} onClick={() => setStep(DAY)}>Day</button>
          <button className="button" style={{ backgroundColor: (step === WEEK) ? '#229FAD' : '#212428' }} onClick={() => setStep(WEEK)}>Week</button>
          <button className="button" style={{ backgroundColor: (step === MONTH) ? '#229FAD' : '#212428' }} onClick={() => setStep(MONTH)}>Month</button>
        </div>
    </div>
    </>
  )};

export default Map;
