import { createStore } from 'vuex';
import firebase from '@/firebase';
import currentUser from './currentUser';
import metaStorge from './metas';
import mainChart from './mainChart';
import adminStore from './admin';

const store = createStore({
  state: {
    currentUser: null,
    userRuns: null,
  },
  getters: {
  },
  mutations: {
    ...currentUser.mutations,
  },
  actions: {
    ...currentUser.actions,
  },
  modules: {
    metas: metaStorge,
    chart: mainChart,
    admin: adminStore,
  },
});

firebase.auth.config({
  afterLogIn(authUser) { store.dispatch('afterLogIn', authUser); },
});

export default store;
