import { getDocs, collection } from 'firebase/firestore';

const parseFromFirestore = (metaSnap) => {
  const data = metaSnap.data();
  const { runs } = data;
  return {
    ...data,
    runs: runs
      .map(({ runId, created }) => ({ runId, created: created.toDate() })),
  };
};

const metaStore = (db) => {
  const metasRef = collection(db, 'metas');

  const getAll = async () => {
    const metaDocs = await getDocs(metasRef);
    return metaDocs.docs.map(parseFromFirestore);
  };

  return { getAll };
};

export default metaStore;
