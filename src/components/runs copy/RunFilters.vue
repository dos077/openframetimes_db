<template>
  <div class="row q-col-gutter-md">
    <div class="col-12">
      <q-card flat bordered>
        <filter-select
          v-for="metaType in metaKeys"
          :key="metaType"
          :metas="metas" :metaType="metaType"
          :metaPick="metaPicks[metaType]" :selectedRuns="selectedRuns"
          @select="select"
        />
      </q-card>
    </div>
    <div class="col-12" v-if="selectedRuns && selectedRuns.length > 0">
      <q-card flat>
        <q-card-section>
          <p class="text-subtitle1 text-black">
            <q-chip v-for="(selection, i) in metaSelections"
              :key="i"
              :color="`${color}-8`" dark
              removable @remove="select(selection)"
            >
              {{ selection.type }}: {{ selection.name }}
            </q-chip>
          </p>
          <q-chip class="text-overline text-black"
            :color="`${color}-2`"
          >
            {{ selectedRuns.length }} runs selected
          </q-chip>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { metaKeys } from '@/data/runKeys';
import FilterSelect from './FilterSelect.vue';

const keyedData = {};
metaKeys.forEach((type) => { keyedData[type] = null; });

export default {
  name: 'RunFilters',
  props: ['metaPool', 'runPool', 'setColor'],
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
