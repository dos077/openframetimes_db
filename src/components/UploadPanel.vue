<template>
  <div class="col">
    <q-card style="min-width: 20rem;">
      <q-card-section class="row q-gutter-md justify-center">
        <div class="col-10">
          <q-file v-model="localFile" label="frametime capture json" />
        </div>
      </q-card-section>
      <q-card-section v-if="parsed"
        class="row q-gutter-md justify-center">
        <div class="col-5">
          <q-input v-model="comment" label="comment" readonly />
        </div>
        <div class="col-5">
          <q-input v-model="gameName" label="game" readonly />
        </div>
        <div class="col-5">
          <q-input v-model="CPU" label="CPU" :disable="!localFile" readonly />
        </div>
        <div class="col-5">
          <q-input v-model="GPU" label="GPU" :disable="!localFile" readonly />
        </div>
        <div class="col-5">
          <q-input v-model="RAM" label="RAM" :disable="!localFile" readonly />
        </div>
        <div class="col-5">
          <q-select v-model="resolution" :options="resOptions"
            label="resolution"
            :disable="!localFile" />
        </div>
        <div class="col-5">
          <q-select v-model="syncCap" :options="syncCapOptions"
            label="refresh rate/framecap"
            :disable="!localFile" />
        </div>
        <div class="col-5">
          <q-select v-model="gamePreset" :options="presetOptions"
            label="preset"
            :disable="!localFile" />
        </div>
        <div class="col-5">
          <q-select v-model="FSR" :options="upscaleOptions"
            label="FSR"
            :disable="!localFile" />
        </div>
        <div class="col-5">
          <q-select v-model="DLSS" :options="upscaleOptions"
            label="DLSS"
            :disable="!localFile" />
        </div>
      </q-card-section>
      <q-card-section v-if="previewCaptures">
        <simple-chart :captures="previewCaptures" />
      </q-card-section>
      <q-card-actions>
        <q-btn
          color="green"
          :disable="loading || !captureReady" @click="previewCapture"
        >
          preview
        </q-btn>
        <q-space />
        <q-btn
          color="blue"
          :disable="loading || !captureReady" @click="addRun"
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
import { parseCapture, readCapture } from '../data/parseCapture';

export default {
  name: 'UploadPanel',
  components: {
    SimpleChart,
  },
  data: () => ({
    localFile: null,
    previewCaptures: null,
    loading: false,
    CPU: null,
    GPU: null,
    RAM: null,
    resolution: null,
    resOptions: [null, '720p', '1080p', '1440p', 'WQHD', '4K'],
    syncCap: null,
    syncCapOptions: [null, 40, 60, 120, 144, 165],
    gamePreset: null,
    presetOptions: [null, 'low', 'medium', 'high', 'ultra'],
    FSR: null,
    DLSS: null,
    upscaleOptions: [null, 'quality', 'balanced', 'performance'],
    comment: null,
    gameName: null,
    parsed: null,
    creationDate: null,
    driver: null,
  }),
  computed: {
    captureReady() {
      if (!this.parsed) return false;
      let ready = true;
      requiredKeys.forEach((key) => { if (!this[key]) ready = false; });
      return ready;
    },
    userId() {
      return this.$store.state.currentUser.uid;
    },
    frameTimes() {
      return this.parsed ? this.parsed.frameTimes : null;
    },
  },
  watch: {
    async localFile(newFile) {
      if (newFile) {
        const rawData = await readCapture(newFile);
        this.parsed = parseCapture(rawData);
      } else {
        this.parsed = null;
        this.previewCaptures = null;
      }
    },
    parsed(newParsed) {
      if (newParsed && newParsed.info) {
        ['comment', ...requiredKeys, ...optionalKeys].forEach((key) => {
          if (newParsed.info[key]) this[key] = newParsed.info[key];
        });
      }
    },
  },
  methods: {
    async previewCapture() {
      const {
        parsed, CPU, GPU, RAM, resolution, gamePreset, FSR, DLSS, gameName, syncCap,
      } = this;
      if (!parsed) return;
      const captureData = {
        CPU,
        GPU,
        RAM,
        resolution,
        syncCap,
        gameName,
        gamePreset,
        FSR: FSR ? `FSR-${FSR}` : null,
        DLSS: DLSS ? `DLSS-${DLSS}` : null,
        frameTimes: parsed.frameTimes,
      };
      this.previewCaptures = [captureData];
    },
    async addRun() {
      this.loading = true;
      if (!this.parsed || !this.parsed.frameTimes) return;
      if (requiredKeys.some((key) => !this[key])) return;
      const runData = { frameTimes: this.parsed.frameTimes };
      requiredKeys.forEach((key) => {
        if (!this[key]) return;
        runData[key] = this[key];
      });
      optionalKeys.forEach((key) => {
        if (this[key]) runData[key] = this[key];
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
