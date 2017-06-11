// entrypoint to load all devDependencies
import { install as offlineInstall } from 'offline-plugin/runtime';
import main from './main';

// if we are on prod create the service worker
if (process.env.NODE_ENV === 'production') {
  offlineInstall();
}

main();
