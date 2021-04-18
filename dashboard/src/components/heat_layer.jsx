import L from 'leaflet';
import "leaflet.heat";
import React, { useEffect, useState } from 'react';
import { useMap} from 'react-leaflet';

const HeatLayer = (props) => {
  const map = useMap();
  console.log(props.data);
  console.log(Math.min(...props.data.map(x => x[2])));

  const maxHeat = Math.max(...props.data.map(x => x[2]));
  console.log(maxHeat);

  useEffect(() => {
    L.heatLayer(props.data, {
      minOpacity: 0,
      max: maxHeat,
      maxZoom: 8,
      blur: 10,
      radius: 10,
      gradient: {0.1: 'blue', 0.3: 'lime', 0.75: 'red'}
    }).addTo(map);
  }, [])

  return ( <div></div> )
}

export default HeatLayer