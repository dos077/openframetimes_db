<template>
  <div class="bg-indigo text-white lt-sm">
    <q-toolbar>
      <q-btn
        round flat
        @click="drawerOn = !drawerOn"
      >
        <q-icon v-if="drawerOn" name="mdi-chevron-up" />
        <q-icon v-else name="mdi-chevron-down" />
      </q-btn>
    </q-toolbar>
    <q-toolbar v-if="drawerOn" inset>
      <q-list class="q-pb-sm">
        <q-item :clickable="currentRoute !== 'home'"
          to="/">
          Database
        </q-item>
        <q-item :clickable="currentRoute !== 'profile'"
          to="/profile">
          User Profile
        </q-item>
        <q-item :clickable="currentRoute !== 'playground'"
          to="/playground">
          Playground
        </q-item>
      </q-list>
    </q-toolbar>
  </div>
  <div class="gt-xs">
    <q-toolbar>
      <q-btn flat to="/" :disable="currentRoute === 'home'">
        Database
      </q-btn>
      <q-btn flat to="/profile" :disable="currentRoute === 'profile'">
        User Profile
      </q-btn>
      <q-btn flat to="/playground" :disable="currentRoute === 'playground'">
        Playground
      </q-btn>
    </q-toolbar>
  </div>
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
