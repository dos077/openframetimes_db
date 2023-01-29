<template>
  <div class="col-12">
    <q-table v-if="displayRuns && displayRuns.length > 0"
      :rows="displayRuns"
      :columns="tableCols"
      row-key="runId"
      selection="multiple"
      v-model:selected="runsSelected"
      :pagination="{ rowsPerPage: 10 }"
      bordered
      flat
    >
      <template v-slot:top>
        <q-toolbar>
          <q-toolbar-title shrink>Uploaded Runs</q-toolbar-title>
          <q-btn-dropdown flat label="filters">
            <run-filters
              :metaPool="metaPool" :runPool="runPool"
              @new-runs="newFilteredRuns"
            />
          </q-btn-dropdown>
          <q-space />
          <span v-if="runsSelected.length > 0">
            <q-btn
              @click="showPreview"
              color="blue"
              outline
              class="q-mr-md"
            >
              preview
            </q-btn>
            <q-btn @click="() => confirmDelete = true"
              color="red"
              outline
            >
              delete
            </q-btn>
          </span>
        </q-toolbar>
      </template>
    </q-table>
    <q-dialog v-model="confirmDelete">
      <q-card>
        <q-card-section>
          Deleting {{ runsSelected.length }} runs
        </q-card-section>
        <q-card-actions>
          <q-btn color="red" @click="deleteRuns()">
            confirm
          </q-btn>
          <q-btn @click="() => confirmDelete = false">
            cancel
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div class="col-12" v-if="previews && previews.length > 0">
      <simple-chart :captures="previews" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { metaKeys } from '@/data/runKeys';
import SimpleChart from '@/components/SimpleChart.vue';
import RunFilters from './runs/RunFilters.vue';

const tableCols = metaKeys
  .map((key) => ({
    label: key,
    field: key,
    align: 'left',
    format: (val) => (!val || val.length < 10
      ? val : `...${val.slice(val.length - 8)}`),
  }));

tableCols.push({ label: 'comment', field: 'comment', align: 'left' });

export default {
  name: 'RunsManager',
  components: {
    SimpleChart,
    RunFilters,
  },
  data: () => ({
    tableCols,
    previews: [],
    filteredRuns: [],
    runsSelected: [],
    confirmDelete: false,
  }),
  computed: {
    ...mapState(['currentUser', 'userRuns']),
    metaPool() {
      return this.$store.state.metas.metas;
    },
    runPool() {
      if (!this.userRuns) return [];
      return this.userRuns.map(({ runId }) => runId);
    },
    displayRuns() {
      const { userRuns, filteredRuns } = this;
      if (!filteredRuns || filteredRuns.length === 0) return userRuns;
      return userRuns.filter(({ runId }) => filteredRuns.includes(runId));
    },
  },
  methods: {
    ...mapActions(['removeRun']),
    showPreview() {
      this.previews = this.runsSelected;
    },
    closePreview() {
      this.previews = [];
    },
    deleteRuns() {
      this.runsSelected.forEach((run) => {
        this.$store.dispatch('removeRun', run);
      });
      this.confirmDelete = false;
    },
    newFilteredRuns(newRuns) {
      this.filteredRuns = newRuns;
      this.runsSelected = [];
    },
  },
  created() {
    if (!this.$store.state.metas.metas) {
      this.$store.dispatch('metas/loadMetas');
    }
  },
};
</script>
