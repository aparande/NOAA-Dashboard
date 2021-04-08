/**
 * Binary Search
 * @param {*} arr The array to search through
 * @param {*} cmp A comparator function which compares the binary search midpoint to a value defined in the comparator
 * @returns The closest element in the array based on the comparator
 */
export const binary_search = (arr, cmp) => {
  let low = 0;
  let high = arr.length - 1;
  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    let comp = cmp(arr[mid]);

    if (comp === 0) return arr[mid];
    if (comp < 0) high = mid;
    else low = mid;
  }
  return arr[low];
}

/**
 * Convert object to GeoJSON
 * @param {*} obj The object to convert
 * @returns A GeoJSON blob compatable with Mapbox
 */
export const to_geojson_point = (obj) => {
  let geojson = {type: "Feature", properties: obj };
  geojson['geometry'] = {
    type: "Point",
    coordinates: [obj['longitude'], obj['latitude']]
  }

  return geojson;
}

/**
 * Creates GeoJSON line out of points
 * @param {*} arr The array of points
 * @returns A GeoJSON line compatible with Mapbox
 */
export const to_geojson_line = (arr) => {
  let points = arr.map(elem => [elem["longitude"], elem["latitude"]]);
  return {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: points
    }
  }
}