import { install as offlineInstall } from 'offline-plugin/runtime';
import comp from './comp';
import '../css/main.css';

function test(num) {
  const squareNum = num * num;
  return squareNum;
}

// if we are on prod create the service worker
if (process.env.NODE_ENV === 'production') {
  offlineInstall();
}
comp('hello');

test(3);
