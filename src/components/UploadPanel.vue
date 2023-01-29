<template>
  <div class="col-12">
    <q-card flat bordered>
      <q-toolbar>
        <q-toolbar-title>
          Upload to Database
        </q-toolbar-title>
      </q-toolbar>
      <q-card-section class="text-caption">
        only captures from CapFrameX are supported at this time
      </q-card-section>
      <file-uploader @newPreview="setPreview" />
      <q-card-section v-if="previewCapture">
        <simple-chart :captures="[previewCapture]" />
      </q-card-section>
      <q-card-actions>
        <q-btn
          color="blue-8"
          :disable="loading || !captureReady" @click="addRun"
          outline
        >
          upload
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import SimpleChart from '@/components/SimpleChart.vue';
import { requiredKeys, optionalKeys } from '@/data/runKeys';
import FileUploader from './upload/FileUploader.vue';

export default {
  name: 'UploadPanel',
  components: {
    SimpleChart,
    FileUploader,
  },
  data: () => ({
    previewCapture: null,
    loading: false,
  }),
  computed: {
    captureReady() {
      const { previewCapture } = this;
      if (!previewCapture || !previewCapture.frameTimes) return false;
      let ready = true;
      requiredKeys.forEach((key) => {
        if (!previewCapture[key]) {
          console.log('preview missing', key);
          ready = false;
        }
      });
      return ready;
    },
  },
  watch: {
    parsed(newParsed) {
      if (newParsed && newParsed.info) {
        ['comment', ...requiredKeys, ...optionalKeys].forEach((key) => {
          if (newParsed.info[key]) this[key] = newParsed.info[key];
          else this[key] = null;
        });
      }
    },
  },
  methods: {
    setPreview(newPreview) {
      console.log('new preview capture');
      this.previewCapture = newPreview;
    },
    async addRun() {
      this.loading = true;
      const { previewCapture } = this;
      if (!previewCapture || !previewCapture.frameTimes) return;
      if (requiredKeys.some((key) => !previewCapture[key])) return;
      const runData = { frameTimes: previewCapture.frameTimes };
      [...optionalKeys, ...requiredKeys].forEach((key) => {
        if (previewCapture[key]) runData[key] = previewCapture[key];
      });
      this.$store.dispatch('addRun', runData);
      this.localFile = null;
      this.loading = false;
    },
    async removeRun(run) {
      this.$store.dispatch('removeRun', run);
    },
  },
};
</script>
