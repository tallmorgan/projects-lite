import {formatMoney, sanitizeNumber} from '../helpers';

class FinancialInput {
  /**
   * Constructor
   */
  constructor(scope, element, attrs, ngModel) {
    Object.assign(this, {scope, element, attrs, ngModel});
    this.initialize();
    this.bindElement();
    this.validate();
  }

  /**
   * Validate and format element on blur
   */
  bindElement() {
    this.element.on('blur', () => {
      this.updateViewValue();
      this.validatePartner();
    });
  }

  /**
   * Immediately format value
   */
  initialize() {
    let unbind = this.scope.$watch(() => {
      this.updateViewValue();
      this.element.triggerHandler('init');
      this.initialized = true;
      this.ngModel.$validate();
      unbind();
    });
  }

  /**
   * Format the input
   */
  updateViewValue() {
    this.ngModel.$viewValue = format(this.ngModel.$viewValue);
    this.ngModel.$render();
    this.ngModel.$modelValue = this.scope.ngModel = sanitizeNumber(this.ngModel.$viewValue);
    this.ngModel.$commitViewValue();
  }

  /**
   * Ensure that min/max ranges are not reversed
   */
  validate() {
    this.ngModel.$validators.financialMinMax = (value) => {
      if (this.partner()) {
        let [partnerValue, thisValue] = [this.partner().$viewValue, value].map(sanitizeNumber);

        if (this.partner().$name.match(/_min$/) && partnerValue > thisValue) {
          return false;
        } else if (this.partner().$name.match(/_max$/) && partnerValue < thisValue) {
          return false;
        }
      }

      return true;
    };
  }

  /**
   * Keep partner fields synchronized
   */
  validatePartner() {
    if (this.partner()) {
      this.partner().$validate();
    }
  }

  /**
   * Safely fetch the partner element
   *
   * It might not be ready by the time we request it, e.g. if field 1
   * immediately requests field 2 during the constructor, the latter
   * would not yet exist.
   */
  partner() {
    if (this.initialized) {
      return this.scope.projectForm[this.scope.partnerField];
    }
  }
}

/**
 * Format a number for display
 * @param value
 * @returns {*}
 */
function format(value) {
  value = formatShortcuts(value || '');
  value = sanitizeNumber(value);
  return value === 0 ? '' : formatMoney(value);
}

/**
 * Replace shortcuts with numbers
 * @param value
 */
function formatShortcuts(value) {
  return value.split(/\s+/).reduce((accrued, segment) => {
    let matches = segment.match(/([\.\d]+)(\w)/);

    if (matches) {
      for (let shortcut in shortcuts) {
        if (matches[2].toLowerCase() === shortcut) {
          return accrued + (shortcuts[shortcut] * parseFloat(matches[1]));
        }
      }
    }

    return sanitizeNumber(segment);
  }, 0);
}

/**
 * Map shortcuts to their values
 */
let shortcuts = {
  h: 100,
  k: 1000,
  m: 1000000,
};

/**
 * Export directive name
 */
export default angular.module('app.financial-input', [])
  .directive('financialInput', () => {
    return {
      restrict: 'A',
      scope: {
        projectForm: '=',
        partnerField: '=',
      },
      require: 'ngModel',
      link: (...args) => new FinancialInput(...args),
    }
  })
  .name;
