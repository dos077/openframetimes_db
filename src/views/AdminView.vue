<template>
  <q-table
    :columns="tableCols"
    :rows="updateLogs"
    row-key="id"
    :pagination="{ rowsPerPage: 20 }"
    selection="multiple"
    v-model:selected="logsSelected"
  >
    <template v-slot:top>
      <q-toolbar>
        <q-btn  v-if="updateLogs.length > 0"
          @click="adminUpdate()">update all</q-btn>
        <q-btn v-if="logsSelected.length > 0"
          color="red" @click="adminReject">
          reject updates
        </q-btn>
      </q-toolbar>
    </template>

  </q-table>
</template>

<script>
const labels = [
  'type', 'gameName', 'CPU', 'GPU', 'resolution', 'gamePreset', 'upscale',
];

const tableCols = labels.map((label) => ({
  label, field: label, align: 'left',
}));

export default {
  name: 'AdminView',
  data: () => ({
    tableCols,
    logsSelected: [],
  }),
  computed: {
    metaPool() {
      return this.$store.state.metas.metas;
    },
    updateLogs() {
      return this.$store.state.admin.logs;
    },
    runs() {
      return this.$store.state.chart.captures;
    },
  },
  methods: {
    adminUpdate() {
      this.$store.dispatch('admin/adminUpdate');
    },
    adminReject() {
      const logs = this.logsSelected;
      this.$store.dispatch('admin/rejectLogs', logs);
    },
  },
  mounted() {
    if (!this.metas || this.metas.length === 0) {
      this.$store.dispatch('metas/loadMetas');
    }
    this.$store.dispatch('admin/loadLogs');
  },
};
</script>
