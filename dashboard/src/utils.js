/**
 * Binary Search
 * @param {*} arr The array to search through
 * @param {*} cmp A comparator function which compares the binary search midpoint to a value defined in the comparator
 * @returns The closest element in the array based on the comparator
 */
export const binary_search = (arr, cmp) => {
  let low = 0;
  let high = arr.length - 1;
  let mid = 0;

  if (cmp(arr[low]) < 0) return arr[low];
  if (cmp(arr[high]) > 0) return arr[high];

  while (low < high) {
    mid = Math.floor((low + high) / 2);
    let comp = cmp(arr[mid]);

    if (comp === 0) return arr[mid];
    if (comp < 0) high = mid;
    else low = mid + 1;
  }

  return arr[mid];
}

export const dist = (x, y) => {
  return Math.sqrt(x * x + y * y);
}
