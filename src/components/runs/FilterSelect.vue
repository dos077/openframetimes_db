<template>
  <q-item v-if="isOn">
    <q-item-section>
      <q-item-label>
        {{ metaType }}
      </q-item-label>
      <q-item-label>
        <q-chip v-for="meta in activeOptions"
          :key="meta.name"
          clickable @click="select(meta)"
          :selected="meta.name === metaPick"
          outline
          :color="getColor(meta)"
        >
          {{  trimName(meta.name)  }}
        </q-chip>
        <q-chip v-for="meta in disabledOptions"
          :key="meta.name"
          outline color="grey-5"
        >
          {{  trimName(meta.name)  }}
        </q-chip>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>

export default {
  name: 'FilterSelect',
  props: ['metas', 'metaPick', 'metaType', 'selectedRuns', 'setColor'],
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
    getColor({ name }) {
      if (!this.setColor) return undefined;
      if (name !== this.metaPick) return undefined;
      return `${this.setColor}-7`;
    },
    trimName(name) {
      if (!name || name.length < 21) return name;
      return `${name.substring(0, 19)}...`;
    },
  },
};
</script>
