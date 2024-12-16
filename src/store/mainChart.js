/* eslint-disable no-await-in-loop */
import firebase from '@/firebase';
import { groupCaptures } from '@/data/parseCapture';

const makeState = () => ({
  captures: [],
  captureGroups: [],
  chartBase: 0.25,
  chartMax: 4,
});

const mutations = {
  setCaptures(state, captures) {
    state.captures = captures;
  },
  setGroups(state, captureGroups) {
    state.captureGroups = captureGroups;
  },
  setBase(state, base) {
    state.chartBase = base;
  },
  setMax(state, max) {
    state.chartMax = max;
  },
};

const actions = {
  async loadCaptures(context, runIds) {
    const captures = [];
    await Promise.all(
      runIds.map(async (runId) => {
        const capture = await firebase.runStore.get(runId);
        if (capture) captures.push(capture);
      }),
    );
    context.commit('setCaptures', captures);
  },
  async loadGroups(context, groups) {
    const captureGroups = [];
    await Promise.all(
      groups.map(async (runIds) => {
        const group = [];
        for (let i = 0; i < runIds.length; i += 1) {
          const capture = await firebase.runStore.get(runIds[i]);
          if (capture) group.push(capture);
        }
        captureGroups.push(groupCaptures(group));
      }),
    );
    context.commit('setGroups', captureGroups);
  },
};

export default {
  namespaced: true,
  state: makeState(),
  mutations,
  actions,
};
