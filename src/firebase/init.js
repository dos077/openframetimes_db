import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

// The configuration below is not sensitive data. You can serenely add your config here
const config = {
  apiKey: process.env.VUE_APP_FBKEY,
  authDomain: process.env.VUE_APP_FBDOMAIN,
  projectId: process.env.VUE_APP_FBPID,
  storageBucket: process.env.VUE_APP_FBBUCKET,
  messagingSenderId: process.env.VUE_APP_FBMSID,
  appId: process.env.VUE_APP_FBAPPID,
  measurementId: process.env.VUE_APP_FBMID,
};

const app = initializeApp(config);
getAnalytics(app);

export default app;
