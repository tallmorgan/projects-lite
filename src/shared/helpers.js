import _ from 'lodash';

/**
 * Return a copy of arr without the specified index
 * @param arr
 * @param index
 */
export function removeByIndex(arr, index) {
  return arr.slice(0, index).concat(arr.slice(index + 1));
}

/**
 * Fill a model's props by index
 * @param arr
 * @param index
 * @param props
 */
export function fillByIndex(arr, index, props) {
  let clone = _.clone(arr);
  let model = clone.splice(index, 1)[0];
  model.fill(props);
  clone.splice(index, 0, model);
  return clone;
}

/**
 * Format a money number into a string
 * @param number
 */
export function formatMoney(number) {
  return '$' + (+number).toLocaleString();
}