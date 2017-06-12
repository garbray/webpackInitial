// import sample from './sample';
function comp(test) {
  console.log(test); // eslint-disable-line
  return test;
}

function lazyLoadSample(text) {
  System.import('./sample').then((res) => {
    const sample = res.default;
    sample(text);
  });
}

// sample('hello');
lazyLoadSample('hello');

export default comp;
