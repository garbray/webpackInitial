import sample from './index';

describe('unit test for sample', () => {
  it('exists', () => {
    expect(sample).to.exist; // eslint-disable-line
  });

  it('should be a function', () => {
    expect(sample).to.be.an('function');
  });
});
