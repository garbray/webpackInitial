import comp from './comp';
import '../scss/main.scss';
import { qs } from './helpers';

export default function main() {
  function square(num) {
    const squareNum = num * num;
    console.log(`square num ${squareNum}`);
    return squareNum;
  }
  comp('hello');
  square(3);
}
