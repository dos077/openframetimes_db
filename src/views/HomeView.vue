<template>
  <div class="home">
    <div class="row">
      home
    </div>
    <div class="row">
      <db-filters />
    </div>
  </div>
</template>

<script>
import DbFilters from '@/components/DbFilters.vue';

export default {
  name: 'HomeView',
  components: {
    DbFilters,
  },
  methods: {
  },
  mounted() {
  },
};
</script>
