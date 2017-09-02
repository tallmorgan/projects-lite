import _ from 'lodash';
import {StorageLocal} from './services/storage-local.service';

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
 * @param predicate
 * @param props
 */
export function fillByPredicate(arr, predicate, props) {
  let clone = _.clone(arr);
  let index = clone.indexOf(_.find(clone, predicate));
  let model = clone.splice(index, 1)[0];
  console.log(model, index);
  model.fill(props);
  clone.splice(index, 0, model);
  return clone;
}

/**
 * Format a money number into a string
 * @param number
 */
export function formatMoney(number) {
  return '$' + (+number || 0).toLocaleString();
}

/**
 * Helper shortcut for local storage outside of Angular
 * @param key
 * @param value
 */
export function store(key, value) {
  return (new StorageLocal).set(key, value);
}

/**
 * Remove non-numerical characters from number string
 * @param {string} number
 * @return {number}
 */
export function sanitizeNumber(number = 0) {
  return parseInt(number.toString().replace(/\D+/g, '')) || 0;
}