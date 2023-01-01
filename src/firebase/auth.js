import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export default (app) => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  provider.addScope('email');
  provider.addScope('profile');

  const signIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error('signin failed', err);
    }
  };

  const signOut = async () => {
    await auth.signOut();
  };

  const config = ({ afterLogIn, afterLogOut }) => {
    auth.onAuthStateChanged((firebaseUser) => {
      if (afterLogIn && firebaseUser) afterLogIn(firebaseUser);
      if (afterLogOut && !firebaseUser) afterLogOut();
    });
  };

  return {
    signIn,
    signOut,
    config,
  };
};
