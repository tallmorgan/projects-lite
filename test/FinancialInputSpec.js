describe('FinancialInputSpec', () => {
  let $compile, $rootScope, defaultInput = '<input type="text" ng-model="dummy.data" financial-input/>';

  beforeEach(module('app'));

  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  let shortcutTests = [
    ['2k', '$2,000'],
    ['1m', '$1,000,000'],
    ['3m 500k', '$3,500,000'],
    ['3.5m', '$3,500,000'],
    ['3.5m 250k', '$3,750,000'],
  ];

  it('should immediately format', () => {
    return new Promise((resolve) => {
      let element = $compile(defaultInput)($rootScope);
      $rootScope.dummy = {data: '2000000'};

      element.on('init', () => {
        expect(element.val()).toBe('$2,000,000');
        resolve();
      });

      $rootScope.$digest();
    });
  });

  it('should expand shortcuts', () => {
    let promises = [];

    for (let i = 0, test; test = shortcutTests[i]; i++) {
      promises.push(new Promise((resolve) => {
        let [input, output] = test;
        let scope = $rootScope.$new(true, $rootScope);
        scope.dummy = {data: input};
        let element = $compile(defaultInput)(scope);
        element.on('init', () => resolve(expect(element.val()).toBe(output)));
        $rootScope.$digest();
      }))
    }

    return Promise.all(promises);
  });

  it('should format the number with commas', () => {
    return new Promise((resolve) => {
      let element = $compile(defaultInput)($rootScope);
      $rootScope.dummy = {data: '123456789'};
      element.on('init', () => resolve(expect(element.val()).toBe('$123,456,789')));
      $rootScope.$digest();
    });
  });

  it('should handle invalid input elegantly (and ensure result is a number)', () => {
    return new Promise((resolve) => {
      let element = $compile(defaultInput)($rootScope);
      $rootScope.dummy = {data: 'invalid input'};
      element.on('init', () => resolve(expect(element.val()).toBe('$0')));
      $rootScope.$digest();
    });
  });
});