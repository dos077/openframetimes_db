<template>
  <q-page padding class="text-left">
    <q-card flat>
      <q-card-section class="row q-col-gutter-md">
        <div class="col-12">
          <simple-chart
            v-if="(captures && captures.length) || (previewGroups && previewGroups.length)"
            :captures="previewGroups ? null : captures" :capture-groups="previewGroups" />
          <q-card v-else flat>
            <q-card-section>
              <p>
                {{ brief }}
              </p>
            </q-card-section>
          </q-card>
        </div>

        <div :class="filterTab === 'main' ? 'col-9' : 'col-3'">
          <q-toolbar>
            <q-toolbar-title v-if="filterTab === 'main'">
              Main Dataset
            </q-toolbar-title>
            <q-btn v-else flat label="Main Set"
              @click="() => filterTab = 'main'" />
          </q-toolbar>
          <q-separator />
          <run-filters
            :mini="filterTab !== 'main'"
            :meta-pool="metaPool" :run-pool="runPool"
            @new-runs="newFilteredRuns"
            :set-color="duoOn ? 'indigo' : undefined"
          />
        </div>
        <div :class="filterTab === 'second' ? 'col-9' : 'col-3'">
          <q-toolbar>
            <q-toolbar-title v-if="filterTab === 'second'">
              Second Set
            </q-toolbar-title>
            <q-btn v-else flat border label="Second"
              @click="() => filterTab = 'second'" />
          </q-toolbar>
          <q-separator />
          <run-filters
            :mini="filterTab !== 'second'"
            :meta-pool="metaPool" :run-pool="runPool"
            @new-runs="newFilteredRuns2"
            set-color="deep-orange"
          />
        </div>
      </q-card-section>
      <q-card-actions  v-if="filteredRuns.length > 0">
        <q-btn @click="loadCaptures" outline>
          chart
        </q-btn>
      </q-card-actions>
    </q-card>

  </q-page>
</template>

<script>
import { mapState } from 'vuex';
import RunFilters from '@/components/runs/RunFilters.vue';
import SimpleChart from '@/components/SimpleChart.vue';

const brief = 'Proof of concept project for measuring game performance with percentage of frames on time. Select datapoints and draw graphs from below.';

export default {
  name: 'HomeView',
  components: {
    RunFilters,
    SimpleChart,
  },
  data: () => ({
    brief,
    runPool: [],
    filteredRuns: [],
    filteredRuns2: [],
    previewCapture: null,
    duoOn: false,
    localOn: false,
    filterTab: 'main',
  }),
  computed: {
    metaPool() {
      return this.$store.state.metas.metas;
    },
    ...mapState({
      captures: (state) => state.chart.captures,
      captureGroups: (state) => state.chart.captureGroups,
    }),
    previewGroups() {
      if (this.duoOn) {
        if (this.captureGroups.length) return this.captureGroups;
      }
      if (this.localOn && this.previewCapture) {
        return [this.captures, [this.previewCapture]];
      }
      return null;
    },
  },
  watch: {
    metaPool(newMetas) {
      if (newMetas && newMetas.length) {
        const runs = [];
        newMetas.forEach((meta) => {
          meta
            .runs
            .map(({ runId }) => runId)
            .forEach((runId) => {
              if (!runs.includes(runId)) runs.push(runId);
            });
        });
        this.runPool = runs;
      }
    },
    duoOn(newOn) {
      if (newOn) this.localOn = false;
    },
    localOn(newOn) {
      if (newOn) this.duoOn = false;
    },
    filterTab(newTab) {
      if (newTab === 'second') {
        this.duoOn = true;
        this.localOn = false;
      } else if (newTab === 'local') {
        this.duoOn = false;
        this.localOn = true;
      }
    },
  },
  methods: {
    newFilteredRuns(newRuns) {
      this.filteredRuns = newRuns;
    },
    newFilteredRuns2(newRuns) {
      this.filteredRuns2 = newRuns;
    },
    newPreview(previewCapture) {
      this.previewCapture = previewCapture;
    },
    loadCaptures() {
      const {
        filteredRuns, filteredRuns2, duoOn,
      } = this;
      if (filteredRuns && filteredRuns.length) {
        if (duoOn && filteredRuns2 && filteredRuns2.length) {
          this.$store.dispatch('chart/loadGroups', [filteredRuns, filteredRuns2]);
        } else {
          this.$store.dispatch('chart/loadCaptures', filteredRuns);
        }
      }
    },
  },
  mounted() {
    if (!this.metas || this.metas.length === 0) {
      this.$store.dispatch('metas/loadMetas');
    }
  },
};
</script>
