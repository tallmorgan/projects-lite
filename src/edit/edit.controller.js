import _ from 'lodash';
import {formatMoney} from '../shared/helpers';

export default class EditController {
  /**
   * Constructor
   */
  constructor($ngRedux, $scope, $stateParams) {
    $scope.$on('$destroy', $ngRedux.connect(state => state)(this));
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
          if (field.financial) {
            field.model = formatMoney(this.project[field.name]);
          } else {
            field.model = this.project[field.name];
          }
        }
      }
    }

    return clone;
  }
}

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