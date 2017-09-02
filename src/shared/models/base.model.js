import _ from 'lodash';

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

    return this;
  }

  /**
   * Create a clone of this model
   */
  clone() {
    return _.clone(this);
  }
}