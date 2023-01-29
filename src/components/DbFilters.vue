<template>
  <div class="row q-col-gutter-md">
    <div class="col-12">
      <q-card flat bordered>
        <q-card-actions>
            <filter-select
              v-for="metaKey in metaKeys"
              :key="metaKey"
              :meta-key="metaKey"
            />
          </q-card-actions>
      </q-card>
    </div>
    <div class="col-12" v-if="selectedRuns && selectedRuns.length > 0">
      <q-card flat bordered>
        <q-card-section>
          <p class="text-subtitle1 text-black">
            <q-chip v-for="(selection, i) in metaSelections"
              :key="i"
              color="indigo-8" dark
              removable @remove="select(selection)"
            >
              {{ selection.type }}: {{ selection.name }}
            </q-chip>
          </p>
          <q-separator />
          <p class="text-overline text-black">
            {{ selectedRuns.length }} runs selected
          </p>
        </q-card-section>
        <q-card-actions>
          <q-btn @click="loadCaptures"
            flat color="indigo-8"
          >
            draw chart
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
    <div v-if="captures && captures.length"
      class="col-12"
    >
      <simple-chart
        v-if="captures && captures.length"
        :captures="captures"
      />
    </div>
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
    metaSelections() {
      if (!this.selectedRuns || this.selectedRuns.length < 0) return '';
      const arr = [];
      const { state } = this.$store;
      metaKeys.forEach((type) => {
        if (state.metas[type]) arr.push({ type, name: state.metas[type] });
      });
      return arr;
    },
  },
  methods: {
    loadCaptures() {
      const runIds = this.selectedRuns;
      this.$store.dispatch('chart/loadCaptures', runIds);
    },
    select({ name, type }) {
      this.$store.dispatch('metas/select', { type, name });
    },
  },
  created() {
    this.$store.dispatch('metas/loadMetas');
  },
};
</script>
