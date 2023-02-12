<template>
  <q-btn @click="adminUpdate()">update</q-btn>
  <q-btn @click="addUpscaleOff('DLSS')">add off</q-btn>
</template>

<script>
import firebase from '@/firebase';

const ids2Arr = (ids, addArr) => {
  ids.forEach((id) => {
    if (!addArr.includes(id)) addArr.push(id);
  });
};

export default {
  name: 'AdminView',
  computed: {
    metaPool() {
      return this.$store.state.metas.metas;
    },
    runs() {
      return this.$store.state.chart.captures;
    },
  },
  methods: {
    adminUpdate() {
      this.$store.dispatch('adminUpdate');
    },
    async updateUpscaleOff(upType, ids) {
      const promises = [];
      for (let i = 0; i < ids.length; i += 1) {
        promises.push((async () => {
          const run = await firebase.runStore.get(ids[i]);
          if (!run[upType]) {
            run[upType] = 'off';
            console.log('reupping run', run);
            await firebase.runStore.remove(run);
            await firebase.runStore.add(run);
          }
        })());
      }
      await Promise.all(promises);
    },
    addUpscaleOff(upscaleType) {
      const { metaPool } = this;
      const offs = [];
      const ons = [];
      metaPool.forEach(({ runs, type }) => {
        const ids = runs.map((r) => r.runId);
        if (type === upscaleType) {
          ids2Arr(ids, ons);
          ids2Arr(ids, offs);
        } else {
          ids2Arr(ids, offs);
        }
      });
      const ids = offs.filter((id) => !ons.includes(id));
      console.log(ids.length);
      this.updateUpscaleOff(upscaleType, ids.slice(0, 1));
    },
  },
  mounted() {
    if (!this.metas || this.metas.length === 0) {
      this.$store.dispatch('metas/loadMetas');
    }
  },
};
</script>
