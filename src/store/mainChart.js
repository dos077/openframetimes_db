import firebase from '@/firebase';

const makeState = () => ({
  captures: [],
});

const mutations = {
  setCaptures(state, captures) {
    state.captures = captures;
  },
};

const actions = {
  async loadCaptures(context, runIds) {
    const captures = await Promise.all(
      runIds.map((runId) => firebase.runStore.get(runId)),
    );
    context.commit('setCaptures', captures);
  },
};

export default {
  namespaced: true,
  state: makeState(),
  mutations,
  actions,
};
