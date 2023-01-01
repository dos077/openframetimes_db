import { createStore } from 'vuex';
import firebase from '@/firebase';
import currentUser from './currentUser';
import metaStorge from './metas';
import mainChart from './mainChart';

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
    async adminUpdate() {
      await firebase.adminStore.processLogs();
    },
  },
  modules: {
    metas: metaStorge,
    chart: mainChart,
  },
});

firebase.auth.config({
  afterLogIn(authUser) { store.dispatch('afterLogIn', authUser); },
});

export default store;
