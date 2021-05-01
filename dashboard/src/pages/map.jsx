import React, { useEffect, useState } from 'react';
import { get_oil_gas_platforms, get_visible_buoys } from '../queries';

import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import Buoy from '../components/buoy';
import Slider from '../components/slider';
import Menu from '../components/menu';
import OilPlatform from '../components/oil_platform';
import HeatLayer from '../components/heat_layer';
import Detection from '../components/detection';
import { Legend, LegendContainer } from '../components/legend';

import traces from '../data/traces.json';
import ship_data from '../data/ship_density_monthly.json';
import { SPECIES_HABITATS, SPECIES_DETECTIONS } from '../constants';

const minTime = Math.min(...Object.values(traces).map((timesteps) => Math.min(...timesteps.map((pt) => pt.timestamp))));
const maxTime = Math.max(...Object.values(traces).map((timesteps) => Math.max(...timesteps.map((pt) => pt.timestamp))));

console.log(minTime, maxTime);

const HOUR = 1 * 60 * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;
const MONTH = DAY * 30;

const attr_links = ["http://osm.org/copyright", "https://hifld-geoplatform.opendata.arcgis.com/datasets/geoplatform::oil-and-natural-gas-platforms/geoservice?geometry=-135.504%2C23.571%2C-72.882%2C36.815", "https://repository.library.noaa.gov/view/noaa/27826", "https://conbio.onlinelibrary.wiley.com/doi/10.1111/cobi.13417"]
const attr = `&copy <a href=${attr_links[0]}>OpenStreetMap</a> | <a href=${attr_links[1]}>HIFL</a> | <a href=${attr_links[2]}>NOAA (Becker et al)</a> | <a href=${attr_links[3]}> NOAA (Welch & Hazen)</a>`

// This is the API Key from MapBox documentation. Might as well just use it for now
// mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

const Map = () => {
  const [currTime, setCurrTime] = useState(1535623127);
  const [platformLocs, setPlatformLocs] = useState([]);
  const [step, setStep] = useState(1*60*60);
  const [buoyNums, setBuoyNums] = useState(Object.keys(traces));
  const [visibleDetections, setVisibleDetections] = useState({});
  const [shippingData, setShippingData] = useState(null);

  // to add a value in the menu, create a state and place its setter into the setLayers dictionary
  const [showBuoyLayer, setShowBuoyLayer] = useState(true);
  const [showOilLayer, setShowOilLayer] = useState(false);
  const [showShippingLayer, setShippingLayer] = useState(false);
  const [visibleHabitatName, setVisibileHabitatName] = useState("None");

  const [habitatData, setHabitatData] = useState([]);

  const detectionFilter = (detection) => {
    // TODO: This is a really strange bug. requires figuring out what types are inside buoyNums
    if (!buoyNums.includes(detection.drift_num) && !buoyNums.includes(detection.drift_num.toString())) return false;
    return detection.timestamp >= currTime && detection.timestamp <= currTime + step;
  };

  useEffect(() => {
    if (visibleHabitatName === "None" || visibleHabitatName === null || visibleHabitatName === undefined) {
      console.log("Not showing habitats");
      setHabitatData([]);
    } else if (visibleHabitatName === "Sea Lion") {
      console.log("Sea Lion Habitat :)");
      setHabitatData(SPECIES_HABITATS[visibleHabitatName].map((pt) => [pt.latitude, pt.longitude, pt.val]));
    } else {
      console.log(`Showing ${visibleHabitatName}`);
      setHabitatData(SPECIES_HABITATS[visibleHabitatName].map((pt) => {
        const [ lat, lon, val ] = pt.map(parseFloat)
        return [ lat, lon - 360, val];
      }));
    }
  }, [visibleHabitatName])

  // layers inside the dictionary should be named how the layer appears in the menu, but without spaces
  const setLayersDict = {
    "Buoys": {
      "BuoyPath": setShowBuoyLayer
    },
    "Development": {
      "OilRigs": setShowOilLayer,
      "ShippingRoutes": setShippingLayer
    },
    "Habitats": {
      "selectedHabitat": setVisibileHabitatName
    }
  }
  // handler used to change state
  const toggleLayer = (menu_item, layer_item, state) => {
    console.log("Set layers", menu_item, layer_item, state);
    if (menu_item === "Detections") {
      const detects = {...visibleDetections};
      if (state) {
        if (Object.keys(detects).includes(layer_item)) return;
        detects[layer_item] = SPECIES_DETECTIONS[layer_item].filter(detectionFilter)

        setVisibleDetections(detects);
      } else {
        if (!Object.keys(detects).includes(layer_item)) return;

        delete detects[layer_item];
        console.log(detects);
        setVisibleDetections(detects);
      }
    } else {
      setLayersDict[menu_item][layer_item](state);
    }
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
    const detects = {...visibleDetections};
    Object.keys(detects).forEach((key) => {
      detects[key] = SPECIES_DETECTIONS[key].filter(detectionFilter)
    })

    // console.log(visible);
    setVisibleDetections(detects);
  }, [currTime, step, buoyNums])

  useEffect(() => {
    let time = "" + (Math.floor(currTime / MONTH) * MONTH) + ".0";
    if (ship_data[time] !== undefined && ship_data[time] !== null) {
      setShippingData(ship_data[time]);
    }
  }, [currTime])

  return (
    <>
    <MapContainer center={[36.7783, -119.4179]} zoom={7} maxZoom={8} minZoom={5} style={{ width: '100%', height: '100vh', position:'absolute', zIndex:'-5', top:'0px'}} >
      <TileLayer
        attribution={attr}
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
      </FeatureGroup>}
      { showShippingLayer && shippingData &&
        <HeatLayer data={ shippingData.map(x => [x.latitude, x.longitude, Math.log(x.MMSI)]) }
                   gradient={{ 0.14 : "#CB94FF", 0.4: "#106DDB", 1: "#490092" }} />
      }
      {/* SPECIES GROUP */}
      <FeatureGroup>
        {
          Object.keys(visibleDetections).map((key) => 
            visibleDetections[key].map((b, idx) => <Detection detection={b} key={`${key} detection ${idx}`} />)).flat()
        }
      </FeatureGroup>
      {/* HABITAT GROUP */}
        {/* Can tweak the coordinates to make it overlap better */}
        {
          visibleHabitatName !== "None" &&
          <HeatLayer data={ habitatData }
                    gradient={{0: '#4b2991', 0.375: '#782b9d', 0.75: '#A3319f', 0.91: '#ca3c97', 0.92: '#ea4f88', 0.93: '#f66d7a', 0.94: '#f89078', 0.95: '#f3b584', 1.0: '#edd9a3'}} />
        }
      <Menu layers={toggleLayer}></Menu>
    </MapContainer>
    <div id="time-slider">
        <div className="sliderwrapper">
          <Slider className="slider" step={ step } minTime={ minTime } maxTime={ maxTime } currTime={ currTime } setCurrTime = { setCurrTime } />
        </div>
        <div className="buttons">
          <button className="button" style={{ backgroundColor: (step === HOUR) ? '#229FAD' : '#212428' }} onClick={() => setStep(HOUR)}>Hour</button>
          <button className="button" style={{ backgroundColor: (step === DAY) ? '#229FAD' : '#212428' }} onClick={() => setStep(DAY)}>Day</button>
          <button className="button" style={{ backgroundColor: (step === WEEK) ? '#229FAD' : '#212428' }} onClick={() => setStep(WEEK)}>Week</button>
          <button className="button" style={{ backgroundColor: (step === MONTH) ? '#229FAD' : '#212428' }} onClick={() => setStep(MONTH)}>Month</button>
        </div>
    </div>
    <LegendContainer>
      { visibleHabitatName !== "None" &&
        <Legend colors={["#4b2991", "#782b9d", "#A3319f", "#ca3c97", "#ea4f88", "#f66d7a", "#f89078", "#f3b584", "#edd9a3"]} stops={[13, 23, 33, 43, 53, 63, 73, 83, 93]} maxVal={1.0} /> }
      { showShippingLayer && shippingData &&
        <Legend colors={["#CB94FF", "#106DDB", "#490092"]} stops={[14, 40, 100]} maxVal={1.0} /> }
    </LegendContainer>
    </>
  )};

export default Map;
