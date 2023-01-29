<template>
  <q-btn-dropdown  v-if="isOn"
    :label="metaType"
    flat
  >
    <q-card>
      <q-card-section>
        <q-chip v-for="meta in activeOptions"
          :key="meta.name"
          clickable @click="select(meta)"
          :selected="meta.name === metaPick"
          outline
        >
          {{  meta.name  }}
        </q-chip>
        <q-chip v-for="meta in disabledOptions"
          :key="meta.name"
          outline color="grey-5"
        >
          {{  meta.name  }}
        </q-chip>
      </q-card-section>
    </q-card>
  </q-btn-dropdown>
</template>

<script>

export default {
  name: 'FilterSelect',
  props: ['metas', 'metaPick', 'metaType', 'selectedRuns'],
  computed: {
    activeOptions() {
      const { metas, metaType, selectedRuns } = this;
      const typed = metas.filter((m) => m.type === metaType);
      if (!selectedRuns || selectedRuns.length === 0) return typed;
      return typed
        .filter((m) => m.runs.some(({ runId }) => selectedRuns.includes(runId)));
    },
    disabledOptions() {
      const { metas, metaType, selectedRuns } = this;
      if (!selectedRuns || selectedRuns.length === 0) return [];
      const typed = metas.filter((m) => m.type === metaType);
      return typed
        .filter((m) => !m.runs.some(({ runId }) => selectedRuns.includes(runId)));
    },
    isOn() {
      return this.metas.filter((m) => m.type === this.metaType).length > 0;
    },
  },
  methods: {
    select({ name, type }) {
      this.$emit('select', { name, type });
    },
  },
};
</script>
