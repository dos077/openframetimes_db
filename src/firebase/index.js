import { getFirestore } from 'firebase/firestore';
import app from './init';
import auth from './auth';
import UserStore from './firestore/users';
import RunStore from './firestore/runs';
import AdminStore from './firestore/admin';
import MetaStore from './firestore/metas';

const db = getFirestore(app);

export default {
  auth: auth(app),
  userStore: UserStore(db),
  runStore: RunStore(db),
  adminStore: AdminStore(db),
  metaStore: MetaStore(db),
};
