import L from 'leaflet';
import oilImg from './icons/oil.png';
import buoyImg from './icons/buoy.png';
import whaleImg from './icons/whale.png';

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

export const SPECIES = {
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