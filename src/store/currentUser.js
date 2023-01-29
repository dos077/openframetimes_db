import firebase from '@/firebase';

const actions = {
  logIn() {
    firebase.auth.signIn();
  },
  async afterLogIn(context, authUser) {
    const user = await firebase.userStore.get(authUser);
    if (!user) {
      const newUser = await firebase.userStore.add(authUser);
      context.commit('setCurrentUser', newUser);
    } else {
      context.commit('setCurrentUser', user);
      const runs = await firebase
        .runStore
        .getByParams({ userId: user.uid });
      context.commit('setUserRuns', runs);
    }
  },
  async logOut(context) {
    await firebase.auth.signOut();
    context.commit('setCurrentUser', null);
    context.commit('setUserRuns', []);
  },
  async updateUser(context, updates) {
    const { uid } = context.state.currentUser;
    await firebase.userStore.update({ uid, updates });
    const updatedUser = await firebase.userStore.get({ uid });
    context.commit('setCurrentUser', updatedUser);
  },
  async deleteUser(context) {
    await firebase.runStore.removeAll(context.state.currentUser);
    await firebase.userStore.remove(context.state.currentUser);
    context.dispatch('logOut');
  },
  async addRun(context, run) {
    const { uid } = context.state.currentUser;
    await firebase.runStore.add({ ...run, userId: uid });
    context.dispatch('loadUserRuns');
  },
  async loadUserRuns(context) {
    const { uid } = context.state.currentUser;
    const runs = await firebase.runStore.getByParams({ userId: uid });
    context.commit('setUserRuns', runs);
  },
  async removeRun(context, run) {
    await firebase.runStore.remove(run);
    context.dispatch('loadUserRuns');
  },
};

const mutations = {
  setCurrentUser(state, newUser) {
    state.currentUser = newUser;
  },
  setUserRuns(state, runs) {
    state.userRuns = runs;
  },
};

export default { actions, mutations };
