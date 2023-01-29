import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import app from './init';
import auth from './auth';
import UserStore from './firestore/users';
import RunStore from './firestore/runs';
import AdminStore from './firestore/admin';
import MetaStore from './firestore/metas';

const db = getFirestore(app);

enableIndexedDbPersistence(db)
  .catch((err) => {
    if (err.code === 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
      console.warn('too many incidents open');
    } else if (err.code === 'unimplemented') {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
      console.log('caching not supported on this browser');
    } else {
      console.warn(err);
    }
  });

export default {
  auth: auth(app),
  userStore: UserStore(db),
  runStore: RunStore(db),
  adminStore: AdminStore(db),
  metaStore: MetaStore(db),
};
