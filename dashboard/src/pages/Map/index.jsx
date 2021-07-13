import React, { useEffect, useState } from 'react';
import { get_oil_gas_platforms, get_visible_buoys } from '../../queries';

import Tour from 'reactour';
import { useCookies } from "react-cookie";
import {AiFillQuestionCircle} from 'react-icons/ai';

import { MapContainer, TileLayer, FeatureGroup, ZoomControl} from 'react-leaflet';
import Buoy from '../../components/buoy';
import Slider from '../../components/Slider';
import Menu from '../../components/Menu';
import OilPlatform from '../../components/oil_platform';
import HeatLayer from '../../components/HeatLayer';
import Detection from '../../components/Detection';
import traces from '../../data/traces.json';
import ship_data from '../../data/ship_density_monthly.json';
import { SPECIES_HABITATS, SPECIES_DETECTIONS } from '../../constants';
import menu_config from '../../configs/menu_config.js';
import {step_var} from './onboarding_steps.jsx';

import ReactGA from 'react-ga';
import analytics from '../../analytics';

import styles from "./map.module.css";
import "../../styles/leaflet.css";

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
  // Base Map State
  const [currTime, setCurrTime] = useState(1535623127);
  const [platformLocs, setPlatformLocs] = useState([]);
  const [step, setStep] = useState(1 * 60 * 60);

  // Layer Data State
  const [buoys, setBuoys] = useState([]);
  const [visibleDetections, setVisibleDetections] = useState({});
  const [heatLayers, setHeatLayers] = useState({});
  const [cookies, setCookie] = useCookies(["new_user"]);
  const [isTourOpen, setIsTourOpen] = useState(false);

  // Menu state
  const [showBuoyLayer, setShowBuoyLayer] = useState(true);
  const [showOilLayer, setShowOilLayer] = useState(false);
  const [showShippingLayer, setShippingLayer] = useState(false);

  const detectionFilter = (detection) => {
    const buoy_nums = buoys.map(b => b.name);
    if (!buoy_nums.includes(`Drift ${detection.drift_num}`)) return false;
    return detection.timestamp >= currTime && detection.timestamp <= currTime + step;
  };

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, [])

  useEffect(() => {
    if (showShippingLayer) {
      let time = "" + (Math.floor(currTime / MONTH) * MONTH) + ".0";
      if (ship_data[time] !== undefined && ship_data[time] !== null) {
        setHeatLayers(h => {
          return {
            ...h, shipping: {
              data: ship_data[time].map(x => [x.latitude, x.longitude, Math.log(x.MMSI)]),
              gradient: { 0.0: '#aad3df', 0.3: 'rgb(116,169,207)', 0.7: 'rgb(54,144,192)', 0.9: 'rgb(5,112,176)', 0.95: 'rgb(4,90,141)', 1.0: 'rgb(2,56,88)' },
              priority: 2,
              legend: { colors: ['#aad3df', 'rgb(116,169,207)', 'rgb(54,144,192)', 'rgb(5,112,176)', 'rgb(4,90,141)', 'rgb(2,56,88)'] }
            }
          }
        })
      }
    } else {
      setHeatLayers(h => {
        const newLayers = { ...h };
        delete newLayers.shipping;
        return newLayers;
      })
    }
  }, [showShippingLayer, currTime]);

  const selectHabitat = (habitat_key) => {
    // Only set habitat data if the data changes, preventing a render loop
    console.log(heatLayers.habitat);
    if ((heatLayers.habitat !== undefined && habitat_key === "none") || (heatLayers.habitat && heatLayers.habitat.meta === habitat_key)) return;

    if (habitat_key === "none" || habitat_key === null || habitat_key === undefined) {
      console.log("Not showing habitats");
      setHeatLayers(h => {
        const newLayers = { ...h };
        delete newLayers.habitat;
        return newLayers;
      })
    } else if (habitat_key === "SL") {
      console.log("Sea Lion Habitat :)");

      setHeatLayers(h => {
        return {
          ...h,
          habitat: {
            meta: habitat_key,
            data: SPECIES_HABITATS[habitat_key].map((pt) => [pt.latitude, pt.longitude, pt.val]),
            gradient: { 0.0: '#aad3df', 0.3: 'rgb(254,153,41)', 0.7: 'rgb(236,112,20)', 0.9: 'rgb(204,76,2)', 0.95: 'rgb(153,52,4)', 1.0: 'rgb(102,37,6)' },
            priority: 1,
            legend: { colors: ['#aad3df', 'rgb(254,153,41)', 'rgb(236,112,20)', 'rgb(204,76,2)', 'rgb(153,52,4)', 'rgb(102,37,6)'] }
          }
        }
      });
    } else {
      console.log(`Showing ${habitat_key}`);

      setHeatLayers(h => {
        return {
          ...h,
          habitat: {
            meta: habitat_key,
            data: SPECIES_HABITATS[habitat_key].map((pt) => {
              const [lat, lon, val] = pt.map(parseFloat)
              return [lat, lon - 360, val];
            }),
            gradient: { 0.0: '#aad3df', 0.3: 'rgb(254,153,41)', 0.7: 'rgb(236,112,20)', 0.9: 'rgb(204,76,2)', 0.95: 'rgb(153,52,4)', 1.0: 'rgb(102,37,6)' },
            priority: 1,
            legend: { colors: ['#aad3df', 'rgb(254,153,41)', 'rgb(236,112,20)', 'rgb(204,76,2)', 'rgb(153,52,4)', 'rgb(102,37,6)'] }
          }
        }
      });
    }
  }

  const selectDetections = (value, detection_name) => {
    const detects = { ...visibleDetections };
    if (value) {
      if (Object.keys(detects).includes(detection_name)) return;
      detects[detection_name] = SPECIES_DETECTIONS[detection_name].filter(detectionFilter);
    } else {
      if (!Object.keys(detects).includes(detection_name)) return;
      delete detects[detection_name];
    }
    setVisibleDetections(detects);
  }

  const menuStateSetters = {
    "buoy_path": (value, item_name) => setShowBuoyLayer(value),
    "oil_rig": (value, item_name) => setShowOilLayer(value),
    "shipping_route": (value, item_name) => setShippingLayer(value),
    "habitat": selectHabitat,
    "detection": selectDetections
  }

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
      setBuoys(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    // console.log(detections);
    const detects = { ...visibleDetections };
    Object.keys(detects).forEach((key) => {
      detects[key] = SPECIES_DETECTIONS[key].filter(detectionFilter)
    })

    // console.log(visible);
    setVisibleDetections(detects);

  }, [currTime, step, buoys]);

  useEffect(() => {
    console.log(cookies.new_user);
    setIsTourOpen(cookies.new_user === undefined);
  }, [])

  const closeTour = () => {
    setCookie("new_user", "false", {
      path: "/map"
    });
    setIsTourOpen(false);
  }

  return (
    <>
      {/* tap=false is required for Safari for some reason https://github.com/PaulLeCam/react-leaflet/issues/822 */}
      <MapContainer center={[36.7783, -119.4179]} zoom={7}
        maxZoom={8} minZoom={5} zoomControl={false} tap={false}
        style={{ width: '100%', height: '100vh', position: 'absolute', zIndex: '-5', top: '0px' }} >
        <ZoomControl position="topleft" />
        <TileLayer
          attribution={attr}
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {/* BUOY GROUP */}
        {showBuoyLayer && <FeatureGroup>
          {
            buoys.map((buoy) =>
              <Buoy currTime={currTime} drift_name={buoy.name} drift_id={buoy.id}
                positions={traces[buoy.name.replace("Drift ", "")]} key={buoy.id} setCurrTime={setCurrTime}
                step={step} minTime={minTime} maxTime={maxTime}
              />)
          }
        </FeatureGroup>}
        {/* DEVELOPMENT GROUP */}
        {showOilLayer && <FeatureGroup>
          {platformLocs.map((b, idx) => <OilPlatform platform={b} key={"platform" + idx} />)}
        </FeatureGroup>}

        {/* SPECIES GROUP */}
        <FeatureGroup>
          {
            Object.keys(visibleDetections).map((key) =>
              visibleDetections[key].map((b, idx) => <Detection detection={b} key={`${key} detection ${idx}`} />)).flat()
          }
        </FeatureGroup>
        {/* HABITAT GROUP */}
        {/* Can tweak the coordinates to make it overlap better */}
        <HeatLayer layers={heatLayers} legendClassName={styles.legendContainer} />
      </MapContainer>
      <Menu setters={menuStateSetters} config={menu_config} />
      <Tour
        steps={step_var}
        isOpen={isTourOpen}
        onRequestClose={closeTour}
        styles={{
          options: {
            zIndex: 10000,
          }
        }}/>
      <div onClick={() => setIsTourOpen(true)}>
        <AiFillQuestionCircle className={styles.onboardingTrigger}/>
      </div>
      <div id="slider" className={styles.timeSlider}>
        <div className={styles.sliderWrapper}>
          <Slider step={step} minTime={minTime} maxTime={maxTime} currTime={currTime} setCurrTime={setCurrTime} />
        </div>
        <div className={styles.buttonRow}>
          <button style={{ backgroundColor: (step === HOUR) ? '#229FAD' : '#212428' }} onClick={() => { setStep(HOUR); analytics.TimeScaleChange(HOUR) }}>Hour</button>
          <button style={{ backgroundColor: (step === DAY) ? '#229FAD' : '#212428' }} onClick={() => { setStep(DAY); analytics.TimeScaleChange(DAY) }}>Day</button>
          <button style={{ backgroundColor: (step === WEEK) ? '#229FAD' : '#212428' }} onClick={() => { setStep(WEEK); analytics.TimeScaleChange(WEEK) }}>Week</button>
          <button style={{ backgroundColor: (step === MONTH) ? '#229FAD' : '#212428' }} onClick={() => { setStep(MONTH); analytics.TimeScaleChange(MONTH) }}>Month</button>
        </div>
      </div>
    </>
  )
};

export default Map;
