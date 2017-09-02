class StorageLocal {
  /**
   * Add a value to localStorage
   * @param key
   * @param value
   */
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    return value;
  }

  /**
   * Retrieve a value from localStorage, or its default
   * @param key
   * @param $default
   */
  get(key, $default = null) {
    let value = localStorage.getItem(key);

    try {
      value = JSON.parse(value);
    } catch (e) {
      value = null;
    }

    return value === null ? $default : value;
  }
}

export default angular.module('app.local-storage', [])
  .service('StorageLocal', StorageLocal)
  .name;