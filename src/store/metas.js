import firebase from '@/firebase';
import { metaKeys } from '@/data/runKeys';

const makeState = () => {
  const state = {
    metas: [],
    selectedRuns: [],
  };
  metaKeys.forEach((type) => {
    state[type] = null;
    state[`${type}Disables`] = [];
    state[`${type}Actives`] = [];
  });
  return state;
};

const mutations = {
  setMetas(state, newMetas) {
    state.metas = newMetas;
    state.selectedRuns = [];
    metaKeys.forEach((type) => {
      state[type] = null;
      state[`${type}Disables`] = [];
      state[`${type}Actives`] = [];
    });
  },
  updateOptions(state) {
    const { metas, selectedRuns } = state;
    metaKeys.forEach((type) => {
      const typeMatches = metas.filter((m) => m.type === type);
      if (!selectedRuns || !selectedRuns.length) {
        state[`${type}Actives`] = typeMatches;
        state[`${type}Disables`] = [];
      } else {
        const actives = [];
        const disables = [];
        typeMatches.forEach((m) => {
          if (m.runs.some(({ runId }) => selectedRuns.includes(runId))) {
            actives.push(m);
          } else disables.push(m);
        });
        state[`${type}Actives`] = actives;
        state[`${type}Disables`] = disables;
      }
    });
  },
  selectRuns(state) {
    const { metas } = state;
    let runIds = [];
    metaKeys.forEach((type) => {
      if (state[type]) {
        const name = state[type];
        const meta = metas
          .find((m) => m.type === type && m.name === name);
        const typeRuns = meta.runs.map((r) => r.runId);
        if (runIds.length === 0) runIds = typeRuns;
        else runIds = runIds.filter((id) => typeRuns.includes(id));
      }
    });
    state.selectedRuns = runIds;
  },
  selectOption(state, { type, name }) {
    if (state[type]) state[type] = null;
    else state[type] = name;
  },
};

const actions = {
  async loadMetas(context) {
    const metas = await firebase.metaStore.getAll();
    context.commit('setMetas', metas);
    context.commit('updateOptions');
  },
  select(context, { type, name }) {
    context.commit('selectOption', { type, name });
    context.commit('selectRuns');
    context.commit('updateOptions');
  },
};

export default {
  state: makeState(),
  mutations,
  actions,
  namespaced: true,
};
