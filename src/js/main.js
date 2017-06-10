import sample from './sample';
import comp from './comp';

function test(num) {
  const squareNum = num * num;
  console.log(squareNum);
  return squareNum;
}

comp('hello');
sample('hello');

test(3);
