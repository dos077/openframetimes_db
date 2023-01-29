<template>
  <q-toolbar class="text-left bg-indigo-6">
    <q-btn v-if="currentRoute !== 'home'"
      round flat
      to="/"
    >
      <q-icon name="mdi-home" />
    </q-btn>
    <q-btn v-if="currentRoute !== 'profile'"
      round flat
      to="/profile"
    >
      <q-icon name="mdi-account" />
    </q-btn>
    <q-separator vertical class="q-mx-sm" />
    <q-toolbar-title v-if="currentRoute === 'home'">
      Open Frametime DB
    </q-toolbar-title>
    <q-toolbar-title v-if="currentRoute === 'profile'">
      User Profile
    </q-toolbar-title>
    <q-space />
  </q-toolbar>
</template>

<script>
export default {
  name: 'NavBar',
  computed: {
    currentRoute() {
      return this.$route.name;
    },
  },
};
</script>
