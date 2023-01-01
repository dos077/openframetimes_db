/* eslint-disable no-await-in-loop */
import {
  collection, query, orderBy, getDocs, deleteDoc, doc, where, updateDoc, addDoc,
} from 'firebase/firestore';
import { metaKeys } from '@/data/runKeys';

const uniqueRuns = ({ runId }, i, arr) => arr
  .findIndex((dp) => dp.runId === runId) === i;

const adminStore = (db) => {
  const metasRef = collection(db, 'metas');

  const addMeta = async ({
    type, name, runId, created,
  }) => {
    const q = query(
      metasRef,
      where('type', '==', type),
      where('name', '==', name),
    );
    const metaSnap = await getDocs(q);
    if (metaSnap.docs && metaSnap.docs.length > 0) {
      const { runs } = metaSnap.docs[0].data();
      runs.push({ runId, created });
      await updateDoc(
        doc(metasRef, metaSnap.docs[0].id),
        { runs: runs.filter(uniqueRuns) },
      );
    } else {
      console.log('adding new meta entry');
      const newEntry = {
        type,
        name,
        runs: [{ runId, created }],
      };
      console.log(newEntry);
      await addDoc(metasRef, newEntry);
    }
  };

  const removeMeta = async ({
    type, name, runId, created,
  }) => {
    console.log('deleting', type, name, runId, created);
    const q = query(
      metasRef,
      where('type', '==', type),
      where('name', '==', name),
    );
    const metaSnap = await getDocs(q);
    const metaDoc = metaSnap.docs[0];
    const { runs } = metaDoc.data();
    const newRuns = runs
      .map((dp) => ({ ...dp, created: dp.created.toDate() }))
      .filter((r) => runId !== r.runId);
    console.log('new runs', newRuns);
    if (newRuns.length > 0) {
      await updateDoc(
        doc(metasRef, metaDoc.id),
        { runs: newRuns },
      );
    } else {
      await deleteDoc(doc(metasRef, metaDoc.id));
    }
  };

  const processUpdate = async (meta) => {
    const promises = [];
    const { runId, created } = meta;
    const updateFn = meta.type === 'add' ? addMeta : removeMeta;
    console.log('processing update log', meta);
    metaKeys.forEach((type) => {
      if (meta[type]) {
        const name = meta[type];
        promises.push(updateFn({
          type, name, runId, created: created.toDate(),
        }));
      }
    });
    await Promise.all(promises);
  };

  const processLogs = async () => {
    const logsRef = collection(db, 'logs');
    const q = query(logsRef, orderBy('created'));
    const logSnaps = await getDocs(q);
    for (let i = 0; i < logSnaps.docs.length; i += 1) {
      const metaDoc = logSnaps.docs[i];
      await processUpdate(metaDoc.data());
      await deleteDoc(doc(db, 'logs', metaDoc.id));
    }
  };

  return { processLogs };
};

export default adminStore;
