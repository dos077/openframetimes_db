<template>
  <q-page padding class="text-left">
    <div class="row q-col-gutter-md">
      <profile-panel />
      <upload-panel v-if="currentUser" />
      <runs-manager v-if="currentUser" />
    </div>
  </q-page>
</template>

<script>
import ProfilePanel from '@/components/ProfilePanel.vue';
import RunsManager from '@/components/RunsManager.vue';
import UploadPanel from '@/components/UploadPanel.vue';
import { mapState } from 'vuex';

export default {
  name: 'UserProfile',
  components: {
    ProfilePanel, RunsManager, UploadPanel,
  },
  computed: {
    ...mapState(['currentUser']),
  },
};
</script>
