import {
  collection, addDoc, doc, deleteDoc, getDocs, query, where, getDoc,
} from 'firebase/firestore';
import { requiredKeys, optionalKeys, metaKeys } from '@/data/runKeys';

const parseFromFirestore = (runSnap) => {
  if (!runSnap.exists()) throw Error('run not found');
  const fbData = runSnap.data();
  const run = {};
  [...requiredKeys, ...optionalKeys]
    .forEach((key) => { if (fbData[key]) run[key] = fbData[key]; });
  run.created = fbData.created.toDate();
  run.runId = runSnap.id;
  return run;
};

const runStore = (db) => {
  const add = async (run) => {
    try {
      if (requiredKeys.some((key) => !run[key])) throw Error('incomplete run data');
      const newRun = { created: new Date() };
      [...requiredKeys, ...optionalKeys]
        .forEach((k) => { if (run[k]) newRun[k] = run[k]; });
      const runRef = await addDoc(collection(db, 'runs'), newRun);
      const newMeta = {
        created: newRun.created,
        type: 'add',
        runId: runRef.id,
        userId: run.userId,
      };
      metaKeys.forEach((key) => { if (newRun[key]) newMeta[key] = newRun[key]; });
      await addDoc(collection(db, 'logs'), newMeta);
      return runRef.id;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const get = async (runId) => {
    try {
      const runRef = doc(db, 'runs', runId);
      const runSnap = await getDoc(runRef);
      return parseFromFirestore(runSnap);
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const getByParams = async (params) => {
    const queries = [];
    Object.keys(params).forEach((key) => {
      queries.push(where(key, '==', params[key]));
    });
    try {
      const q = query(collection(db, 'runs'), ...queries);
      const runSnaps = await getDocs(q);
      return runSnaps.docs.map(parseFromFirestore);
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const remove = async ({ runId }) => {
    try {
      const runSnap = await getDoc(doc(db, 'runs', runId));
      if (!runSnap.exists()) throw Error('trying to remove nonexisting run');
      const run = parseFromFirestore(runSnap);
      const newMeta = {
        created: new Date(),
        type: 'remove',
        runId,
        userId: run.userId,
      };
      metaKeys.forEach((key) => {
        if (run[key]) newMeta[key] = run[key];
      });
      await deleteDoc(doc(db, 'runs', runId));
      await addDoc(collection(db, 'logs'), newMeta);
    } catch (err) {
      console.error(err);
    }
  };

  const removeAll = async ({ uid }) => {
    try {
      const q = query(collection(db, 'runs'), where('userId', '==', uid));
      const runSnaps = await getDocs(q);
      const removals = [];
      runSnaps.forEach((runDoc) => removals.push(remove({ rundId: runDoc.id })));
      await Promise.all(removals);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    add, remove, removeAll, getByParams, get,
  };
};

export default runStore;
