import {formatMoney} from '../helpers';

class FinancialInput {
  /**
   * Constructor
   */
  constructor(scope, element, attrs, ngModel) {
    Object.assign(this, {scope, element, attrs, ngModel});
    this.initialize();
    element.on('blur', () => this.updateViewValue());
  }

  /**
   * Immediately format value
   */
  initialize() {
    let unbind = this.scope.$watch(() => {
      this.updateViewValue();
      this.element.triggerHandler('init');
      unbind();
    });
  }

  /**
   * Format the input
   */
  updateViewValue() {
    this.ngModel.$setViewValue(format(this.ngModel.$viewValue));
    this.ngModel.$render();
  }
}

/**
 * Format a number for display
 * @param value
 * @returns {*}
 */
function format(value) {
  value = formatShortcuts(value);
  return formatMoney(value.toString().replace(/\D+/g, ''));
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
        if (matches[2] === shortcut) {
          return accrued + (shortcuts[shortcut] * parseFloat(matches[1]));
        }
      }
    }

    return +segment;
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
      scope: {},
      require: 'ngModel',
      link: (...args) => new FinancialInput(...args),
    }
  })
  .name;
