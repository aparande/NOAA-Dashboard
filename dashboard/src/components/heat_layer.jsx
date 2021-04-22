import L from 'leaflet';
import "leaflet.heat";
import React, { useEffect, useState, useRef } from 'react';
import { useMap} from 'react-leaflet';

const HeatLayer = (props) => {
  const map = useMap();
  // const [currLayer, set] = useState(-119.4179);
  // console.log(props.data);
  // console.log(Math.min(...props.data.map(x => x[2])));

  const maxHeat = Math.max(...props.data.map(x => x[2]));
  const [heatmap, setHeatMap] = useState(L.heatLayer(props.data, {
    minOpacity: 0,
    max: maxHeat,
    maxZoom: 8,
    blur: 10,
    radius: 10,
    gradient: {0.1: 'blue', 0.3: 'lime', 0.75: 'red'}
  }));
  /// console.log(maxHeat);

  // Cache heatmap
  useEffect(() => {
    const heat = L.heatLayer(props.data, {
      minOpacity: 0,
      max: maxHeat,
      maxZoom: 8,
      blur: 10,
      radius: 10,
      gradient: {0.1: 'blue', 0.3: 'lime', 0.75: 'red'}
    });
    setHeatMap(heat);
  }, [props.data]);

  useEffect(() => {
    if(props.name == "None"){
      console.log("Remove");
      heatmap.removeFrom(map);
    }
    else{
      console.log("Put");
      heatmap.removeFrom(map);
      heatmap.addTo(map);
    }
  }, [heatmap, props.name]);

  return ( <div></div> )
}

export default HeatLayer