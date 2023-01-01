<template>
  <profile-panel />
  <runs-manager />
  <upload-panel />
</template>

<script>
import ProfilePanel from '@/components/ProfilePanel.vue';
import RunsManager from '@/components/RunsManager.vue';
import UploadPanel from '@/components/UploadPanel.vue';

export default {
  name: 'UserProfile',
  components: { ProfilePanel, RunsManager, UploadPanel },
};
</script>
