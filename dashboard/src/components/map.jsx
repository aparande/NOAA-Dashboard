import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import db from '../firebase.config';

// This is the API Key from MapBox documentation. Might as well just use it for now
mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';
const BUOYS = [4, 7, 10, 12, 13, 14, 16, 18, 19, 20, 21, 22, 23];

// var dummy_geojson = {
//   type: "FeatureCollection",
//   features: [{
//     type: 'Feature',
//     geometry: {
//       type: 'Point',
//       coordinates: [-122.414, 37.776]
//     },
//     properties: {
//       title: 'Mapbox',
//       description: 'San Francisco, California'
//     }
//   }]
// };

/**
 * Get buoy GPS data as a trace
 * @param {*} buoy_num the Drift to retrieve
 * @param {*} start_date seconds since epoch
 * @param {*} end_date seconds since epoch
 * @param {*} limit how many rows to get
 */
const get_buoy_trace = async (buoy_num, start_date, end_date = undefined , limit = 10) => {
  let basic_query = db.collection("buoy_gps").where("drift_num", "==", buoy_num).where("timestamp", ">=", start_date);
  if (end_date !== undefined) basic_query = basic_query.where("timestamp", '<=', end_date);

  const snapshot = await basic_query.orderBy('timestamp', 'asc').limit(limit).get();
  console.log(`Retrieved ${snapshot.size} rows from ${buoy_num} GPS`);
  return snapshot.docs.map((doc) => {
    const obj = {type: "Feature"};
    const point_data = doc.data();
    obj["properties"] = point_data;
    obj["geometry"] = {
      type: "Point",
      coordinates: [point_data.longitude, point_data.latitude]
    }

    return obj;
  });
}

const get_all_traces = async (start_date, end_date = undefined) => {
  var traces = {};
  for (let i = 0; i < BUOYS.length; i++) {
    const buoy_num = BUOYS[i];
    const data = await get_buoy_trace(buoy_num, start_date, end_date);
    if (data.length > 0) traces[buoy_num] = data;
  }
  console.log(traces);
  return traces
}

const Map = () => {
  const mapContainer = useRef(null);
  const [lng, setLng] = useState(-119.4179);
  const [lat, setLat] = useState(36.7783);
  const [zoom, setZoom] = useState(6);
  const [traces, setTraces] = useState({});
  const [map, setMap] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Initialize map when component mounts
  useEffect(() => {
    async function fetchData() {
      const initial_trace = await get_all_traces(1532508419);
      setTraces(initial_trace);
    }
    fetchData();
  }, [])

  useEffect(() => {
    const start_json = Object.keys(traces).map((drift_num) => {
      return traces[drift_num][0]
    });
    console.log(start_json);
    

    if (map == null || map === undefined) return;
    const source = map.getSource("buoys");
    if (source === undefined) return;

    source.setData({
      type: "FeatureCollection",
      features: start_json
    })
  }, [traces, mapLoaded]);

  useEffect(() => {
    const mapbox = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });

    mapbox.on('move', () => {
      setLng(mapbox.getCenter().lng.toFixed(4));
      setLat(mapbox.getCenter().lat.toFixed(4));
      setZoom(mapbox.getZoom().toFixed(2));
    });

    mapbox.addControl(new mapboxgl.NavigationControl(), "top-right")

    mapbox.on('load', () => {
      mapbox.loadImage( 'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png', function (error, image) {
        if (error) throw error;
        mapbox.addImage('custom-marker', image);

        mapbox.addSource('buoys', {
          type: 'geojson',
          data: {
            type: "FeatureCollection",
            features: []
          }
        });

        mapbox.addLayer({
          'id': 'buoys',
          'type': 'symbol',
          'source': 'buoys',
          'layout': {
            'icon-image': 'custom-marker',
            // get the title name from the source's "title" property
            // 'text-field': ['get', 'title'],
            // 'text-font': [
            //   'Open Sans Semibold',
            //   'Arial Unicode MS Bold'
            // ],
            // 'text-offset': [0, 1.25],
            // 'text-anchor': 'top'
          }
        });

        setMapLoaded(true);
      });
    });

    setMap(mapbox);
    
    // Clean up on unmount
    return () => {
      mapbox.remove();
      setMap(null);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='map-container' ref={mapContainer} />
  );
};

export default Map;
