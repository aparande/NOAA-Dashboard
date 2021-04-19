const admin = require('firebase-admin');
const { BUOYS } = require('./constants');

const serviceAccount = require('./serviceAccountKey.json');

/* Load Firebase Credentials
 Follow the instructions at https://firebase.google.com/docs/firestore/quickstart#python
 DO NOT COMMIT serviceAccountKey.json to git */
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
console.log("Initialized DB");

/**
 * Get buoy GPS data as a trace
 * @param {*} buoy_num the Drift to retrieve
 * @param {*} start_date seconds since epoch
 * @param {*} end_date seconds since epoch
 * @param {*} limit how many rows to get
 * @returns An array of dictionaries representing the trace of a buoy
 */
const get_buoy_trace = async (buoy_num, start_date, end_date = undefined , limit = 10) => {
  let basic_query = db.collection("buoy_gps").where("drift_num", "==", buoy_num).where("timestamp", ">=", parseInt(start_date));
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
const get_all_traces = async (start_date, end_date = undefined, limit=100) => {
  var traces = {};
  for (let i = 0; i < BUOYS.length; i++) {
    const buoy_num = BUOYS[i];
    const data = await get_buoy_trace(buoy_num, start_date, end_date, limit);
    if (data.length > 0) traces[buoy_num] = data;
  }
  return traces
}

const get_tol = async (start_date, end_date, buoy_num) => {
  const drift_name = `Drift ${buoy_num}`;
  console.log(`Querying TOL for ${drift_name}`);
  const snapshot = await db.collection("metrics").where("drift_name", "==", drift_name).where("metric_name", "==", "TOL").get();
  // console.log(snapshot);
  if (snapshot.empty) {
    console.log(`No TOL data found ${drift_name}`);
    return {};
  } else {
    console.log(`TOL data found ${drift_name}. Querying for ${start_date} to ${end_date}`);
    const inner_query = snapshot.docs[0].ref.collection("raw").where("timestamp", '<=', end_date).where("timestamp", ">=", start_date);
  
    const inner_snapshot = await inner_query.orderBy('timestamp', 'asc').get();
    console.log(`Retrieved ${inner_snapshot.size} TOL rows from Drift ${buoy_num}`);
    return inner_snapshot.docs.map(doc => doc.data());
  }
  
}

module.exports = { get_buoy_trace, get_all_traces, get_tol };