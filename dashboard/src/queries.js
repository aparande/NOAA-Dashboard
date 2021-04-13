import db from './firebase.config';
import { BUOYS } from './constants';
import axios from 'axios';  

/**
 * Get buoy GPS data as a trace
 * @param {*} buoy_num the Drift to retrieve
 * @param {*} start_date seconds since epoch
 * @param {*} end_date seconds since epoch
 * @param {*} limit how many rows to get
 * @returns An array of dictionaries representing the trace of a buoy
 */
export const get_buoy_trace = async (buoy_num, start_date, end_date = undefined , limit = 10) => {
  let basic_query = db.collection("buoy_gps").where("drift_num", "==", buoy_num).where("timestamp", ">=", start_date);
  if (end_date !== undefined) basic_query = basic_query.where("timestamp", '<=', end_date);

  const snapshot = await basic_query.orderBy('timestamp', 'asc').limit(limit).get();
  console.log(`Retrieved ${snapshot.size} rows from ${buoy_num} GPS`);
  return snapshot.docs.map(doc => doc.data());
}

/**
 * Get traces for all buoys
 * @param {*} start_date Seconds since 1970 to start querying on
 * @param {*} end_date Seconds since 1970 to stop querying on
 * @param {*} limit The maximum number of points to get for each buoy
 * @returns A trace for each buoy
 */
export const get_all_traces = async (start_date, end_date = undefined, limit=100) => {
  var traces = {};
  for (let i = 0; i < BUOYS.length; i++) {
    const buoy_num = BUOYS[i];
    const data = await get_buoy_trace(buoy_num, start_date, end_date, limit);
    if (data.length > 0) traces[buoy_num] = data;
  }
  console.log(traces);
  return traces
}

// https://hifld-geoplatform.opendata.arcgis.com/datasets/geoplatform::oil-and-natural-gas-platforms/geoservice?geometry=-135.504%2C23.571%2C-72.882%2C36.815
export const get_oil_gas_platforms = async () => {
  const URL = "https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/Oil_and_Natural_Gas_Platforms/FeatureServer/0/query?where=REGION%20%3D%20'PACIFIC'&outFields=*&outSR=4326&f=json"
  const res = await axios.get(URL,
    { 
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
  console.log(res)
  return res.data.features.map((feat) => feat.attributes);
} 