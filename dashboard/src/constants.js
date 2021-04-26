import L from 'leaflet';
import oilImg from './icons/oil.png';
import buoyImg from './icons/buoy.png';
import whaleImg from './icons/whale.png';

//  TODO:  Move these to the server
import ba_habitat from './data/Ba-habitat.json';
import bb_habitat from './data/Bb-habitat.json';
import bm_habitat from './data/Bm-habitat.json';
import bp_habitat from './data/Bp-habitat.json';
import dc_habitat from './data/Dc-habitat.json';
import dd_habitat from './data/Dd-habitat.json';
import gg_habitat from './data/Gg-habitat.json';
import lb_habitat from './data/Lb-habitat.json';
import lo_habitat from './data/Lo-habitat.json';
import mn_habitat from './data/Mn-habitat.json';
import pd_habitat from './data/Pd-habitat.json';
import sc_habitat from './data/Sc-habitat.json';
import sl_habitat from './data/sea-lion-habitat.json';
import tt_habitat from './data/Tt-habitat.json';


export const oilIcon = new L.Icon({
  iconUrl: oilImg,
  iconSize: new L.Point(30, 40),
  className: 'leaflet-marker-icon'
});

export const buoyIcon = new L.Icon({
  iconUrl: buoyImg,
  iconSize: new L.Point(25, 40),
  iconAnchor: new L.Point(12.5, 40),
  className: 'leaflet-marker-icon'
});

export const whaleIcon = new L.Icon({
  iconUrl: whaleImg,
  iconSize: new L.Point(40, 40),
  iconAnchor: new L.Point(12.5, 40),
  className: 'leaflet-marker-icon'
})

export const SPECIES_DETECTION_KEYS = {
  "BW": "Unidentified Beaked Whale",
  "?BW": "Possible Beaked Whale",
  "ZC": "Cuvier's Beaked Whale",
  "BB": "Baird's Beaked Whale",
  "MS": "Stejneger's Beaked Whale",
  "BW43": "Possibly Perrin's Beaked Whale",
  "BW37V": "Possibly Hubb's Beaked Whale",
  "BWC": "Cross Seamount Beaked Whale",
  "PM": "Sperm Whale",
  "NBHF": "Narrow Band High Frequency"
}

export const SPECIES_HABITATS = {
  "Minke Whale" : ba_habitat,
  "Baird's Beaked Whale": bb_habitat,
  "Blue Whale": bm_habitat,
  "Fin Whale": bp_habitat,
  "Long-Beaked Common Dolphin": dc_habitat,
  "Short-Beaked Common Dolphin": dd_habitat,
  "Risso's Dolphin": gg_habitat,
  "Northern Right Whale Dolphin": lb_habitat,
  "Pacific White-Sided Dolphin": lo_habitat,
  "Humpback Whale": mn_habitat,
  "Dall's Porpoise": pd_habitat,
  "Striped Dolphin": sc_habitat,
  "Sea Lion": sl_habitat,
  "Common Bottlenose Dolphin": tt_habitat
}

export const SPECIES_HABITAT_KEYS = Object.keys(SPECIES_HABITATS);