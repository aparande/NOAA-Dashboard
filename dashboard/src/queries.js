import axios from 'axios';

// https://hifld-geoplatform.opendata.arcgis.com/datasets/geoplatform::oil-and-natural-gas-platforms/geoservice?geometry=-135.504%2C23.571%2C-72.882%2C36.815
export const get_oil_gas_platforms = async () => {
  const URL = "https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/Oil_and_Natural_Gas_Platforms/FeatureServer/0/query?where=REGION%20%3D%20'PACIFIC'&outFields=*&outSR=4326&f=json"
  const res = await axios.get(URL,
    { 
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
  // console.log(res)
  return res.data.features.map((feat) => feat.attributes);
} 

export const get_tol = async (start_date, step, buoy_num, statistic) => {
  const URL = "/api/get_tol";
  const end_date = start_date + step;
  const res = await axios.get(URL,
    { 
      params: {
        start: start_date,
        end: end_date,
        buoyId: buoy_num,
        statistic: statistic
      }
    })
  console.log(res);
  return res.data;
}

export const get_bb = async (start_date, end_date, buoy_num, agg) => {
  const URL = "/api/get_bb";
  const res = await axios.get(URL,
    { 
      params: {
        start: start_date,
        end: end_date,
        buoyId: buoy_num,
        agg: agg
      }
    })
  console.log(res);
  return res.data;
}

export const get_visible_buoys = async (start_date) => {
  const URL = "/api/visible_buoys";
  const res = await axios.get(URL,
    { 
      params: {
        start: start_date,
      }
    })
  console.log(res);
  return res.data;
}