import _ from 'lodash';
import {formatMoney} from '../shared/helpers';
import * as actionTypes from '../shared/action-types';

export default class EditController {
  /**
   * Constructor
   */
  constructor($ngRedux, $scope, $stateParams) {
    $scope.$on('$destroy', $ngRedux.connect(state => state, mapDispatch)(this));
    this.project = this.projects.find((project) => project.id == $stateParams.project_id);
    this.fieldGroups = this.fillDefaults(fieldGroups);
  }

  /**
   * Append existing information to each field
   * @param fieldGroups
   */
  fillDefaults(fieldGroups) {
    let clone = _.clone(fieldGroups);

    for (let i = 0, fieldGroup; fieldGroup = clone[i]; i++) {
      for (let ii = 0, field; field = fieldGroup[ii]; ii++) {
        if (typeof this.project[field.name] !== 'undefined') {
          field.model = this.project[field.name];
        }
      }
    }

    return clone;
  }
}

/**
 * Map dispatch to controller
 */
let mapDispatch = {
  submitProject: (fieldGroups, project) => {
    let fields = _.flattenDeep(fieldGroups).map((field) => {
      field.model = field.financial ? parseInt(field.model.toString().replace(/\D+/g, '')) : field.model;
      return field;
    });

    return {
      type: actionTypes.PROJECTS_EDIT,
      props: _.chain(fields).keyBy('name').mapValues('model').value(),
      fields,
    }
  }
};

/**
 * Define each editable field
 */
let fieldGroups = [
  [{
    title: 'Headline',
    name: 'headline',
    model: '',
  }],
  [{
    title: 'Check Size Minimum',
    name: 'target_check_size_min',
    model: '',
    financial: true,
  }, {
    title: 'Check Size Maximum',
    name: 'target_check_size_max',
    model: '',
    financial: true,
  }],
  [{
    title: 'Revenue Minimum',
    name: 'target_revenue_min',
    model: '',
    financial: true,
  }, {
    title: 'Revenue Maximum',
    name: 'target_revenue_max',
    model: '',
    financial: true,
  }],
  [{
    title: 'EBITDA Minimum',
    name: 'target_ebitda_min',
    model: '',
    financial: true,
  }, {
    title: 'EBITDA Maximum',
    name: 'target_ebitda_max',
    model: '',
    financial: true,
  }],
];