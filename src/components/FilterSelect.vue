<template>
  <q-btn-dropdown  v-if="isOn"
    flat
    :label="metaKey"
  >
    <q-card>
      <q-card-section>
        <q-chip v-for="meta in activeOptions"
          :key="meta.name"
          clickable @click="select(meta)"
          :selected="meta.name === selected"
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
  props: ['metaKey'],
  computed: {
    activeOptions() {
      return this.$store.state.metas[`${this.metaKey}Actives`];
    },
    disabledOptions() {
      return this.$store.state.metas[`${this.metaKey}Disables`];
    },
    selected() {
      return this.$store.state.metas[this.metaKey];
    },
    isOn() {
      return (this.activeOptions && this.activeOptions.length)
        || (this.disabledOptions && this.disabledOptions.length);
    },
  },
  methods: {
    select({ name, type }) {
      this.$store.dispatch('metas/select', { type, name });
    },
  },
};
</script>
