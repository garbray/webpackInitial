import sample from './index';

describe('sample', () => {
  it('exists', () => {
    expect(sample).to.exist;
  });

  it('should be a function', () => {
    console.log(typeof sample);
    expect(sample).to.be.an('function');
  });
});
