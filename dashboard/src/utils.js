/**
 * Binary Search
 * @param {*} arr The array to search through
 * @param {*} cmp A comparator function which compares the binary search midpoint to a value defined in the comparator
 * @returns The closest interval in the array based on the comparator
 */
export const interval_search = (arr, cmp) => {
  let low = 0;
  let high = arr.length - 1;
  let mid = 0;

  const safeInterval = (idx) => [arr[idx], (idx + 1 < arr.length)? arr[idx + 1] : null];

  // If the lowest is greater than the search term (i.e term | arr[low] | ...) 
  if (cmp(arr[low]) < 0) return safeInterval(low);

  // If the highest is less than the search term (i.e ... | arr[high] | term)
  if (cmp(arr[high]) > 0) return safeInterval(high);

  while (low < high) {
    // TODO: Replace with binary search
    // mid = Math.floor((low + high) / 2);
    // let comp = cmp(arr[mid]);

    // if (comp === 0) return safeInterval(mid);
    // if (comp < 0) high = mid;
    // else low = mid + 1;
    if (cmp(arr[low]) >= 0 && cmp(arr[low + 1]) <= 0) {
      return safeInterval(low);
    }
    low += 1
  }

  // return safeInterval(mid);
  return safeInterval(low);
}

export const dist = (x, y) => {
  const dx = x[0] - y[0];
  const dy = x[1] - y[1];
  return Math.sqrt(dx * dx + dy * dy);
}

export const mean = (data) => {
  let out = data.reduce((accum, curr) => {
    let vals = {...accum};
    Object.keys(curr).forEach(key => vals[key] = parseFloat(vals[key]) + parseFloat(curr[key]));
    return vals;
  })
  Object.keys(out).forEach(key => out[key] /= data.length);
  return out;
}

export const group_by = (data, agg) => {
  let agg_data = {};

  data.forEach((pt) => {
    let timestamp = Math.floor(pt.timestamp / agg) * agg;
    if (agg_data[timestamp] === null || agg_data[timestamp] === undefined) {
      agg_data[timestamp] = [ pt ]
    } else {
      agg_data[timestamp].push(pt)
    }
  })

  return agg_data;
}

export const interpolate = (start, end, percent) => {
  return (1 - percent) * start + percent * end;
}
