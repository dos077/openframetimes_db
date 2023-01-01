<template>
  <div class="row q-col-gutter-md">
    <div class="col-12">
      <q-card>
        <q-toolbar>
          <span>Your Runs</span>
          <q-space />
          <span v-if="runsSelected.length > 0">
            <q-btn
              @click="showPreview"
              color="blue"
            >
              preview
            </q-btn>
            <q-btn @click="() => confirmDelete = true" color="red">
              delete
            </q-btn>
          </span>
        </q-toolbar>
        <q-card-section>
          <q-table v-if="userRuns && userRuns.length > 0"
            :rows="userRuns"
            :columns="tableCols"
            row-key="runId"
            selection="multiple"
            v-model:selected="runsSelected"
          ></q-table>
        </q-card-section>
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
      </q-card>
    </div>
    <div class="col-12" v-if="previews && previews.length > 0">
      <simple-chart :captures="previews" />
    </div>
  </div>
</template>

<script>
import SimpleChart from '@/components/SimpleChart.vue';
import { mapActions, mapState } from 'vuex';
import { metaKeys } from '@/data/runKeys';

export default {
  name: 'RunsManager',
  components: {
    SimpleChart,
  },
  data: () => ({
    tableCols: metaKeys.map((key) => ({ label: key, field: key, align: 'left' })),
    previews: [],
    runsSelected: [],
    confirmDelete: false,
  }),
  computed: {
    ...mapState(['currentUser', 'userRuns']),
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
  },
};
</script>
