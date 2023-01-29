<template>
  <div class="col-12 text-left">
    <q-card v-if="currentUser" flat bordered>
      <q-toolbar>
        <q-toolbar-title>
          Use Profile
        </q-toolbar-title>
      </q-toolbar>
      <q-card-section class="row q-col-gutter-sm">
        <div class="col-6">
          <q-input v-model="currentUser.email" label="email" readonly />
        </div>
        <div class="col-6">
          <q-input v-model="newName" label="user name" />
        </div>
      </q-card-section>
      <q-card-actions>
        <q-btn v-if="isChange" @click="prepUpdate" flat color="blue">
          update
        </q-btn>
        <q-btn
          @click="deleteUser"
          flat size="sm" color="red"
        >delete profile</q-btn>
      </q-card-actions>
      <q-card-actions>
        <q-btn @click="logOut" color="grey-9" outline>
          log out
        </q-btn>
      </q-card-actions>
    </q-card>
    <q-card v-if="!currentUser" flat bordered
      style="max-width: 25rem; margin: 0 auto;"
    >
      <q-toolbar>
        <q-toolbar-title>
          Login with Google
        </q-toolbar-title>
      </q-toolbar>
      <q-card-section>
        {{ explainer }}
      </q-card-section>
      <q-card-actions>
        <q-btn @click="logIn" outline>login</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

const explainer = 'This database identifies user and their captures with Google login. The only information collected through login is your email.';

export default {
  name: 'ProfilePanel',
  data: () => ({
    newName: null,
    confirmDelete: false,
    explainer,
  }),
  computed: {
    ...mapState(['currentUser']),
    isChange() {
      return this.newName !== this.currentUser.displayName;
    },
  },
  watch: {
    currentUser: {
      immediate: true,
      handler(newUser) {
        if (newUser) {
          this.newName = newUser.displayName;
        }
      },
    },
  },
  methods: {
    ...mapActions(['logIn', 'logOut', 'deleteUser', 'updateUser']),
    prepUpdate() {
      if (!this.isChange || !this.newName) return;
      const updates = {};
      updates.displayName = this.newName;
      this.updateUser(updates);
    },
  },
};
</script>
