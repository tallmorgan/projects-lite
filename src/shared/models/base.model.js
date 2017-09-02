export default class BaseModel {
  /**
   * Constructor
   */
  constructor(props = {}) {
    this.fill(props);
  }

  /**
   * Merge given props into this model
   * @param props
   */
  fill(props) {
    for (let key in props) {
      if (props.hasOwnProperty(key)) {
        this[key] = props[key];
      }
    }
  }
}