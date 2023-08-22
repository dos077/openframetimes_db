/* eslint-disable no-await-in-loop */
import firebase from '@/firebase';

const makeState = () => ({
  logs: [],
});

const mutations = {
  setLogs(state, newLogs) {
    state.logs = newLogs;
  },
};

const actions = {
  async adminUpdate(context) {
    await firebase.adminStore.processLogs();
    context.dispatch('loadLogs');
  },
  async loadLogs(context) {
    const logs = await firebase.adminStore.getLogs();
    context.commit('setLogs', logs);
  },
  async rejectLogs(context, logs) {
    console.log('rejecting updates');
    logs.forEach((log) => console.log(log));
    for (let i = 0; i < logs.length; i += 1) {
      const log = logs[i];
      if (log.type === 'add') {
        await firebase.runStore.remove({ runId: log.runId });
        await firebase.adminStore.deleteLog(log.id);
      }
    }
    context.dispatch('loadLogs');
  },
};

export default {
  state: makeState(),
  mutations,
  actions,
  namespaced: true,
};
