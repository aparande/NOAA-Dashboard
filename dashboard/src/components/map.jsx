import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { get_all_traces } from '../queries';
import { binary_search, to_geojson_point, to_geojson_line} from '../utils';

// This is the API Key from MapBox documentation. Might as well just use it for now
mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

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

const Map = () => {
  const mapContainer = useRef(null);
  const [lng, setLng] = useState(-119.4179);
  const [lat, setLat] = useState(36.7783);
  const [zoom, setZoom] = useState(6);
  const [traces, setTraces] = useState({});
  const [map, setMap] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [currTime, setCurrTime] = useState(1532508419);
  const [lineLayerInit, setLineLayerInit] = useState(false);

  // Effect to load the data when the app first loads
  useEffect(() => {
    async function fetchData() {
      const initial_trace = await get_all_traces(currTime);
      setTraces(initial_trace);
    }
    fetchData();
  }, []);

  // Effect to set up the map
  useEffect(() => {
    // Set up the map
    const mapbox = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });

    // Update the state for map center and zoom on map move
    mapbox.on('move', () => {
      setLng(mapbox.getCenter().lng.toFixed(4));
      setLat(mapbox.getCenter().lat.toFixed(4));
      setZoom(mapbox.getZoom().toFixed(2));
    });

    mapbox.addControl(new mapboxgl.NavigationControl(), "top-right")

    // Set up layers once the map is loaded
    mapbox.on('load', () => {
      mapbox.loadImage('https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png', function (error, image) {
        if (error) throw error;
        mapbox.addImage('custom-marker', image);
        mapbox.addSource('buoys', { type: 'geojson', data: { type: "FeatureCollection", features: [] } });
        mapbox.addLayer({ 'id': 'buoys', 'type': 'symbol', 'source': 'buoys', 'layout': { 'icon-image': 'custom-marker' } });

        setMapLoaded(true);
      });
    });

    setMap(mapbox);

    // Clean up on unmount
    return () => {
      mapbox.remove();
      setMap(null);
      setMapLoaded(false);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!mapLoaded) return;

    Object.keys(traces).forEach((drift_num) => {
      let points = to_geojson_line(traces[drift_num]);
      if (lineLayerInit) {
        if (map == null || map === undefined) return;
        const source = map.getSource(`buoy_route_${drift_num}`);
        if (source === undefined) return;

        source.setData(points);
      } else {
        if (map == null || map === undefined) return;

        map.addSource(`buoy_route_${drift_num}`, { type: 'geojson', data: points });
        map.addLayer({
          'id': `buoy_route_${drift_num}`,
          'type': 'line',
          'source': `buoy_route_${drift_num}`,
          'layout': {
            'line-join': 'round',
            'line-cap': 'round'
          },
          'paint': {
            'line-color': '#F00',
            'line-width': 8
          }
        });

        setLineLayerInit(true);
      }
    });
  }, [traces, mapLoaded])

  // Effect to put the points on the map which are at most 2 minutes after the current time
  // Reloads every time mapLoaded, traces, or currTime changes value
  useEffect(() => {
    // Search for the closest timestamp point in the traces using binary search
    let points = Object.keys(traces).map((drift_num) => {
      return binary_search(traces[drift_num], (elem) => {
        if (elem.timestamp === currTime) return 0;
        else if (elem.timestamp < currTime) return 1;
        else if (elem.timestamp > currTime) return -1;
      });
    });
    console.log(points);

    // Filter to points which are up to 2 minutes after the current time
    points = points.filter((elem) => {
      let diff = elem.timestamp - currTime;
      return diff >= 0 && elem.timestamp < currTime + 120;
    })

    let geojson = points.map(to_geojson_point);

    if (map == null || map === undefined) return;
    const source = map.getSource("buoys");
    if (source === undefined) return;

    source.setData({
      type: "FeatureCollection",
      features: geojson
    })
  }, [traces, mapLoaded, currTime]);

  return (
    <div className='map-container' ref={mapContainer} />
  );
};

export default Map;
