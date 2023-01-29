<template>
  <div class="q-gutter-md">
    <q-list v-if="mini">
      <q-item v-for="([type, name]) in Object.entries(metaPicks)" :key="type">
        <q-item-section>
          <q-item-label>{{ type }}</q-item-label>
          <q-item-label caption
            :class="`text-${setColor}-7`"
          >
            {{ name }}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item v-if="selectedRuns.length">
        <q-item-section>
          {{ selectedRuns.length }} runs selected
        </q-item-section>
      </q-item>
    </q-list>
    <q-list v-else>
      <filter-select
        v-for="metaType in metaKeys"
        :key="metaType"
        :metas="metas" :metaType="metaType"
        :metaPick="metaPicks[metaType]"
        :selectedRuns="selectedRuns"
        :setColor="setColor"
        @select="select"
      />
      <q-item v-if="selectedRuns.length">
        <q-item-section>
          {{ selectedRuns.length }} runs selected
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { metaKeys } from '@/data/runKeys';
import FilterSelect from './FilterSelect.vue';

const keyedData = {};
metaKeys.forEach((type) => { keyedData[type] = null; });

export default {
  name: 'RunFilters',
  props: ['metaPool', 'runPool', 'setColor', 'mini'],
  components: {
    FilterSelect,
  },
  data: () => ({
    metaKeys,
    selectedRuns: [],
    ...keyedData,
  }),
  computed: {
    metas() {
      const { metaPool, runPool } = this;
      if (!runPool || runPool.length === 0) return metaPool;
      const res = [];
      metaPool.forEach((meta) => {
        if (meta.runs.some(({ runId }) => runPool.includes(runId))) {
          res.push(meta);
        }
      });
      return res;
    },
    metaPicks() {
      const picks = {};
      metaKeys.forEach((type) => { if (this[type]) picks[type] = this[type]; });
      return picks;
    },
    metaSelections() {
      const selections = [];
      const { metaPicks } = this;
      Object
        .entries(metaPicks)
        .forEach(([type, name]) => selections.push({ type, name }));
      return selections;
    },
    color() {
      return this.setColor || 'indigo';
    },
  },
  methods: {
    select({ name, type }) {
      console.log('selecting', type, name);
      if (this[type]) this[type] = null;
      else this[type] = name;
      const { metas } = this;
      let newRuns = [];
      metaKeys.forEach((metaType) => {
        const pick = this[metaType];
        if (pick) {
          const matchedRuns = metas
            .find((m) => m.type === metaType && m.name === pick)
            .runs
            .map(({ runId }) => runId);
          if (newRuns.length === 0) {
            newRuns = [...matchedRuns];
          } else {
            newRuns = newRuns.filter((runId) => matchedRuns.includes(runId));
          }
        }
      });
      this.selectedRuns = newRuns || [];
      this.$emit('newRuns', this.selectedRuns);
    },
  },
};
</script>
