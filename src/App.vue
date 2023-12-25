<template>
  <q-layout view="hHh lpR fFf">
    <q-header>
      <nav-bar />
    </q-header>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  name: 'App',
  components: {
    NavBar,
  },
  data: () => ({
    drawerOn: false,
  }),
  created() {
    if (sessionStorage.redirect) {
      const { redirect } = sessionStorage;
      delete sessionStorage.redirect;
      this.$router.push(redirect);
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
}

</style>
