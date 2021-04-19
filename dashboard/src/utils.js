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

  if (cmp(arr[low]) < 0) return safeInterval(low);
  if (cmp(arr[high]) > 0) return safeInterval(high);

  while (low < high) {
    mid = Math.floor((low + high) / 2);
    let comp = cmp(arr[mid]);

    if (comp === 0) return safeInterval(mid);
    if (comp < 0) high = mid;
    else low = mid + 1;
  }

  return safeInterval(mid);
}

export const dist = (x, y) => {
  return Math.sqrt(x * x + y * y);
}

export const mean = (data) => {
  let out = data.reduce((accum, curr) => {
    let vals = {...accum};
    Object.keys(curr).forEach(key => vals[key] += curr[key]);
    return vals;
  })
  Object.keys(out).forEach(key => out[key] /= data.length);
  return out;
}
