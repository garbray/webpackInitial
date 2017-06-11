import { install as offlineInstall } from 'offline-plugin/runtime';
import comp from './comp';
import '../scss/main.scss';

function square(num) {
  const squareNum = num * num;
  console.log(`square num ${squareNum}`);
  return squareNum;
}

// if we are on prod create the service worker
if (process.env.NODE_ENV === 'production') {
  offlineInstall();
}
comp('hello');

square(3);
