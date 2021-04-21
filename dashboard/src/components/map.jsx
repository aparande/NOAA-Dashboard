import React, { useEffect, useState } from 'react';
import { get_oil_gas_platforms, get_visible_buoys } from '../queries';

import { MapContainer, TileLayer, LayersControl, FeatureGroup, LayerGroup, useMap} from 'react-leaflet';
import Buoy from './buoy';
import Labeled from './Labeled';
import OilPlatform from './oil_platform';
import HeatLayer from './heat_layer';
import Detection from './detection';

import sea_lion_habitat from '../data/sea-lion-habitat.json';
import traces from '../data/traces.json';
import detections from '../data/detections.json';

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
  const [buoyNums, setBuoyNums] = useState([4]);
  const [visibleDetections, setVisibleDetections] = useState([]);

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
  }, [])

  useEffect(() => {
    const visible = detections.filter((detection) => {
      if (!buoyNums.includes(detection.drift_num)) return false;
      return detection.timestamp >= currTime && detection.timestamp <= currTime + step;
    })
    setVisibleDetections(visible);
  }, [currTime, step, buoyNums])

  return (
    <div>
      <MapContainer center={[lat, lng]} zoom={zoom} style={{ width: '100%', height: '100vh'}} >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Normal">
            <TileLayer
              attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.Overlay name = "Sea Lion Heatmap">
              {/* Can tweak the coordinates to make it overlap better */}
            <HeatLayer data={ sea_lion_habitat.map(x => [x.latitude, x.longitude, x.val]) } />
          </LayersControl.Overlay>
          <LayersControl.Overlay name = "Buoy Location">
            <FeatureGroup>
              { 
                buoyNums.map((key, idx) => 
                  <Buoy currTime={ currTime } drift_num={ key } 
                    positions={ traces[key] } key={ idx } setCurrTime = { setCurrTime } 
                    step={step}
                  />)
              }
            </FeatureGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Oil">
            <FeatureGroup>
            { platformLocs.map((b, idx) => <OilPlatform platform={b} key={"platform" + idx} />) }
            </FeatureGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Detections">
            <FeatureGroup>
            { visibleDetections.map((b, idx) => <Detection detection={b} key={"detection" + idx} />) }
            </FeatureGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
      <div id="time-slider">
        <div className="sliderwrapper">
          <Labeled className="slider" step={ step } minTime={ minTime } maxTime={ maxTime } currTime={ currTime } setCurrTime = { setCurrTime } />
        </div>
        <div className="buttons">
          <button className="button" style={{ backgroundColor: (step === HOUR) ? '#229FAD' : '#FFF' }} onClick={() => setStep(HOUR)}>Hour</button>
          <button className="button" style={{ backgroundColor: (step === DAY) ? '#229FAD' : '#FFF' }} onClick={() => setStep(DAY)}>Day</button>
          <button className="button" style={{ backgroundColor: (step === WEEK) ? '#229FAD' : '#FFF' }} onClick={() => setStep(WEEK)}>Week</button>
          <button className="button" style={{ backgroundColor: (step === MONTH) ? '#229FAD' : '#FFF' }} onClick={() => setStep(MONTH)}>Month</button>
        </div>
      </div>
    </div>
  )};

export default Map;
