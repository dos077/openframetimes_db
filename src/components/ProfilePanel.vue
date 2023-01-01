<template>
  <div class="row q-pa-md">
    <div style="max-width: 30rem">
      <q-card v-if="currentUser">
        <q-card-section>
          <q-input v-model="currentUser.email" label="email" readonly />
          <q-input v-model="newName" label="user name" />
          <q-btn v-if="isChange" @click="prepUpdate">update</q-btn>
        </q-card-section>
        <q-card-actions>
          <q-btn @click="logOut">log out</q-btn>
          <q-btn @click="deleteUser">delete profile</q-btn>
        </q-card-actions>
      </q-card>
      <q-card v-if="!currentUser">
        <q-btn @click="logIn">login</q-btn>
      </q-card>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ProfilePanel',
  data: () => ({
    newName: null,
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
