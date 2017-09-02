describe('StorageLocalSpec', () => {
  let StorageLocal;
  beforeEach(module('app'));
  beforeEach(inject((_StorageLocal_) => StorageLocal = _StorageLocal_));

  it('should be able to set items and return the value', () => {
    expect(StorageLocal.set('testSet', 'abc')).toBe('abc');
  });

  it('should be able to fetch items', () => {
    StorageLocal.set('testGet', 'def');
    expect(StorageLocal.get('testGet')).toBe('def');
  });

  it('should be able to use default values', () => {
    expect(StorageLocal.get('testDefault', 'defaulting')).toBe('defaulting');
  });
});