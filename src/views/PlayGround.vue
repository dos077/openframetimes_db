<template>
  <q-page padding class="text-left">
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <q-card bordered flat>
          <q-card-section>
            <file-uploader
              @newPreview="setPreview"
              @formValidated="setFormReady(true)"
              @formError="setFormReady(false)"
              @newUpload="addCapture"
            />
          </q-card-section>
        </q-card>
      </div>
      <runs-table v-if="runs && runs.length > 0" :displayRuns="runs" :customKeys="true"
        @deleteRuns="removeRuns"
      />
    </div>
  </q-page>
</template>

<script>
import FileUploader from '@/components/upload/FileUploader.vue';
import RunsTable from '@/components/runs/RunsTable.vue';

export default {
  name: 'PlayGround',
  components: {
    FileUploader,
    RunsTable,
  },
  data: () => ({
    runs: [],
    previewRun: null,
    previewValid: false,
  }),
  methods: {
    setPreview(preview) {
      this.previewRun = preview;
    },
    setFormReady(ready) {
      if (!this.previewRun) this.previewValid = false;
      else this.previewValid = ready;
    },
    addRun() {
      const { previewRun, previewValid } = this;
      if (!previewValid) return;
      this.runs.push(previewRun);
    },
    addCapture(captureData) {
      this.runs.push({
        ...captureData,
        runId: (new Date()).getTime(),
      });
    },
    removeRuns(runIds) {
      console.log('removing runs', runIds);
      this.runs = this.runs.filter(({ runId }) => !runIds.includes(runId));
    },
    removeRun(index) {
      if (this.runs.length <= index) return;
      this.runs.splice(index, 1);
    },
  },
};
</script>
