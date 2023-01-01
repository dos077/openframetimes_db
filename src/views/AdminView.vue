<template>
  <q-btn @click="adminUpdate()">update</q-btn>
</template>

<script>
export default {
  name: 'AdminView',
  methods: {
    adminUpdate() {
      this.$store.dispatch('adminUpdate');
    },
  },
};
</script>
