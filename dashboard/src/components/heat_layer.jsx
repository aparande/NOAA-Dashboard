import L from 'leaflet';
import "leaflet.heat";
import React, { useEffect, useState, useRef } from 'react';
import { useMap } from 'react-leaflet';

const HeatLayer = (props) => {
  const map = useMap();
  const [heatLayer, setHeatLayer] = useState(null);

  useEffect(() => {
    console.log("Creating Heat Map")
    const maxHeat = Math.max(...props.data.map(x => x[2]));
    const heat = L.heatLayer([], {
      minOpacity: 0,
      max: maxHeat,
      maxZoom: 8,
      blur: 20,
      radius: 15,
      gradient: props.gradient || {0.1: 'blue', 0.3: 'lime', 0.75: 'red'}
    }).addTo(map);
    setHeatLayer(heat);

    // When the component dismouts, remove the heatmap from the map
    return () => {
      console.log("Cleaning up heatmap");
      heat.removeFrom(map);
      setHeatLayer(null);
    }
  }, [])

  // Update heatmap
  useEffect(() => {
    console.log("Updating heatmap")
    const maxHeat = Math.max(...props.data.map(x => x[2]));
    // console.log(maxHeat);
    // console.log(props.data);
    if (heatLayer !== null && heatLayer !== undefined) {
      heatLayer.setLatLngs(props.data);
      heatLayer.setOptions({ max: maxHeat });
    }
  }, [props.data, heatLayer]);

  return (
    <div />
  )
}

export default HeatLayer
