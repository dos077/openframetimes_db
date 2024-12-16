<template>
    <q-toolbar>
      <q-btn flat to="/" :disable="currentRoute === 'home'">
        Frametime DB Demo
      </q-btn>
      <q-btn flat to="/playground" :disable="currentRoute === 'playground'">
        Playground
      </q-btn>
    </q-toolbar>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'NavBar',
  data: () => ({
    drawerOn: false,
  }),
  computed: {
    currentRoute() {
      return this.$route.name;
    },
    ...mapState(['currentUser']),
  },
};
</script>
