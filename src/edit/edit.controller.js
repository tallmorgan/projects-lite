import _ from 'lodash';
import Project from '../shared/models/project.model';
import * as actionTypes from '../shared/action-types';
import fieldGroups from './edit.fields';

export default class EditController {
  /**
   * Constructor
   */
  constructor($ngRedux, $scope, $stateParams, $state) {
    Object.assign(this, {$ngRedux, $scope, $stateParams, $state});
    $scope.$on('$destroy', $ngRedux.connect(state => state, mapDispatch)(this));
    this.project = this.projects.find((project) => project.id == $stateParams.project_id) || new Project;
    this.fieldGroups = this.fillDefaults(fieldGroups);
  }

  /**
   * Append existing information to each field
   * @param fieldGroups
   */
  fillDefaults(fieldGroups) {
    let clone = JSON.parse(JSON.stringify(fieldGroups));

    for (let i = 0, fieldGroup; fieldGroup = clone[i]; i++) {
      for (let ii = 0, field; field = fieldGroup[ii]; ii++) {
        if (typeof this.project[field.name] !== 'undefined') {
          field.model = this.project[field.name];
        }
      }
    }

    return clone;
  }

  /**
   * Submit the form
   */
  submitForm() {
    this.$scope.projectForm.$setSubmitted();

    if (!this.$scope.projectForm.$invalid) {
      this.processForm(this);
      this.$state.go('list');
    }
  }
}

/**
 * Map dispatch to controller
 */
let mapDispatch = {
  /**
   * Edit or create a project
   * @returns {object}
   */
  processForm: ({fieldGroups, project, projects}) => {
    let type = project.id ? actionTypes.PROJECTS_EDIT : actionTypes.PROJECTS_CREATE;
    let fields = _.flattenDeep(JSON.parse(JSON.stringify(fieldGroups))).map(sanitizeFields);
    let props = _.chain(fields).keyBy('name').mapValues('model').value();
    props.id = project.id || _.chain(projects).map('id').max().value() + 1 || 1;
    project = project.clone().fill(props);
    return {fields, type, project, props};
  }
};

/**
 * Sanitize fields for storage
 * @param field
 * @returns {*}
 */
function sanitizeFields(field) {
  field.model = field.financial ? parseInt(field.model.toString().replace(/\D+/g, '')) : field.model;
  return field;
}