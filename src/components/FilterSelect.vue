<template>
  <div class="col-3" v-if="isOn">
    <div class="text-h6">
      {{ metaKey }}
    </div>
    <q-chip v-for="meta in activeOptions"
      :key="meta.name"
      clickable @click="select(meta)"
      :selected="meta.name === selected"
      color="indigo-6" dark
    >
      {{  meta.name  }}
    </q-chip>
    <q-chip v-for="meta in disabledOptions"
      :key="meta.name"
    >
      {{  meta.name  }}
    </q-chip>
  </div>
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
