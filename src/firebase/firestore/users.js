import {
  setDoc, doc, getDoc, updateDoc, deleteDoc, getDocs, collection,
} from 'firebase/firestore';

const immutableKeys = [
  'email', 'photoURL', 'uid',
];

const mutableKeys = [
  'displayName',
];

const parseFromFirestore = (fbUser) => {
  const user = {};
  [...immutableKeys, ...mutableKeys]
    .forEach((key) => { if (fbUser[key]) user[key] = fbUser[key]; });
  user.created = fbUser.created.toDate();
  user.updated = fbUser.updated.toDate();
  return user;
};

const userStore = (db) => {
  const add = async (fbUser) => {
    try {
      const userRef = doc(db, 'users', fbUser.uid);
      let userSnap = await getDoc(userRef);
      if (userSnap.exists()) throw Error('user already exist');
      const userData = {};
      [...immutableKeys, ...mutableKeys]
        .forEach((key) => { if (fbUser[key]) userData[key] = fbUser[key]; });
      await setDoc(userRef, {
        ...userData,
        created: new Date(),
        updated: new Date(),
      });
      userSnap = await getDoc(userRef);
      return parseFromFirestore(userSnap.data());
    } catch (err) {
      console.error('error adding user', err);
      return false;
    }
  };

  const get = async ({ uid }) => {
    try {
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);
      return userSnap.exists()
        ? parseFromFirestore(userSnap.data()) : false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const getAll = async () => {
    try {
      const collectionRef = collection(db, 'users');
      const userSnaps = await getDocs(collectionRef);
      const users = [];
      userSnaps
        .docs
        .forEach((snap) => users.push(parseFromFirestore(snap.data())));
      return users;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const update = async ({ uid, updates }) => {
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) throw Error(uid, 'does not exist and cannot update');
      const newData = { updated: new Date() };
      mutableKeys.forEach((k) => {
        if (updates[k]) newData[k] = updates[k];
      });
      await updateDoc(docRef, newData);
    } catch (err) {
      console.error(err);
    }
  };

  const remove = async ({ uid }) => {
    try {
      await deleteDoc(doc(db, 'users', uid));
    } catch (err) {
      console.error(err);
    }
  };

  return {
    add, update, remove, get, getAll,
  };
};

export default userStore;
