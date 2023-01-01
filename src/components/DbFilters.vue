<template>
  <div style="max-width: 60rem; margin: 0 auto;">
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="row q-col-gutter-md">
          <filter-select
            v-for="metaKey in metaKeys"
            :key="metaKey"
            :meta-key="metaKey"
          />
        </div>
      </q-card-section>
    </q-card>
    <q-card v-if="selectedRuns && selectedRuns.length > 0">
      <q-toolbar>
        <q-toolbar-title>
          {{ selectedRuns.length }} runs
        </q-toolbar-title>
        <q-space />
        <q-btn @click="loadCaptures">
          draw chart
        </q-btn>
      </q-toolbar>
      <simple-chart
        v-if="captures && captures.length"
        :captures="captures"
      />
    </q-card>
  </div>
</template>

<script>
import FilterSelect from './FilterSelect.vue';
import SimpleChart from './SimpleChart.vue';
import { metaKeys } from '../data/runKeys';

export default {
  name: 'DbFilters',
  components: {
    FilterSelect,
    SimpleChart,
  },
  data: () => ({
    metaKeys,
  }),
  computed: {
    selectedRuns() {
      return this.$store.state.metas.selectedRuns;
    },
    captures() {
      return this.$store.state.chart.captures;
    },
  },
  methods: {
    loadCaptures() {
      const runIds = this.selectedRuns;
      this.$store.dispatch('chart/loadCaptures', runIds);
    },
  },
  created() {
    this.$store.dispatch('metas/loadMetas');
  },
};
</script>
