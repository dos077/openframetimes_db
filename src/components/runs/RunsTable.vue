<template>
  <div class="col-12">
    <q-table
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
        <q-toolbar v-if="customKeys">
          <p>
            Label Graph:
          </p>
          <q-option-group
            name="data_keys"
            v-model="keysSelected"
            :options="keyOptions"
            type="checkbox"
            inline
          ></q-option-group>
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
      <simple-chart :captures="previews" :refKeys="customKeys ? keysSelected : null" />
    </div>
  </div>
</template>

<script>
import { metaKeys } from '@/data/runKeys';
import SimpleChart from '@/components/SimpleChart.vue';

const tableCols = metaKeys
  .map((key) => ({
    label: key,
    field: key,
    align: 'left',
    format: (val) => (!val || val.length < 10
      ? val : `...${val.slice(val.length - 8)}`),
  }));

export default {
  name: 'RunsManager',
  props: ['displayRuns', 'customKeys'],
  components: {
    SimpleChart,
  },
  data: () => ({
    tableCols,
    previews: [],
    filteredRuns: [],
    runsSelected: [],
    confirmDelete: false,
    keyOptions: [...metaKeys, 'comment'].map((value) => ({ label: value, value })),
    keysSelected: [...metaKeys, 'comment'],
  }),
  methods: {
    showPreview() {
      this.previews = this.runsSelected;
    },
    closePreview() {
      this.previews = [];
    },
    deleteRuns() {
      this.$emit('deleteRuns', this.runsSelected.map(({ runId }) => runId));
      this.confirmDelete = false;
    },
  },
};
</script>
