/**
 * Return a copy of arr without the specified index
 * @param arr
 * @param index
 */
export function removeByIndex(arr, index) {
  return arr.slice(0, index).concat(arr.slice(index + 1));
}