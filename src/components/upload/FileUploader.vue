<template>
  <q-card flat>
    <q-list v-if="mini && currentFile">
      <q-item v-for="([type, name]) in Object.entries(metaPicks)" :key="type">
        <q-item-section>
          <q-item-label>{{ type }}</q-item-label>
          <q-item-label caption
            :class="`text-${setColor}-7`"
          >
            {{ name }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <q-card-section v-if="!mini">
      <q-file v-model="localFiles" label="frametime capture json"
        clearable :max-files="10" multiple />
    </q-card-section>
    <q-card-section v-if="!mini && currentFile">
      <q-form class="row q-col-gutter-sm">
        <q-input v-model="comment" label="comment" clearable
          class="col-6"
        />
        <q-input v-model="gameName" label="game" readonly
          class="col-6"
          error-message="game name required"
          :error="!isNameValid"
          />
        <q-input v-model="CPU" label="CPU" :disable="!currentFile" readonly
          class="col-6"
          error-message="CPU required"
          :error="!isCPUValid"/>
        <q-input v-model="GPU" label="GPU" :disable="!currentFile" readonly
          class="col-6"
          error-message="GPU required"
          :error="!isGPUValid"/>
        <q-input v-model="RAM" label="RAM" :disable="!currentFile" readonly
          class="col-6"
          error-message="RAM required"
          :error="!isRAMValid"/>
        <q-select v-model="resolution" :options="resOptions"
          label="resolution"
          :disable="!currentFile"
          class="col-6"
          error-message="invalid resolution"
          :error="!isResValid"/>
        <q-select v-model="gamePreset" :options="presetOptions"
          label="preset"
          :disable="!currentFile"
          class="col-6"
          error-message="invalid game preset"
          :error="!isPresetValid"/>
        <q-select v-model="upscale" :options="upscaleOptions"
          label="upscale"
          :disable="!currentFile"
          class="col-6"
          error-message="invalid upscale preset"
          :error="!isUpscaleValid"/>
      </q-form>
    </q-card-section>
    <q-card-section v-if="previewCapture">
      <q-form class="row q-col-gutter-sm">
        <q-input :model-value="currentFile" readonly clearable
          class="col-6" :label="'1/' + localFiles.length"
        >
          <template v-slot:append>
            <q-btn @click="localFiles = localFiles.slice(1)"
              color="red-8"
              outline
              class="q-mr-sm"
              size="small"
            >
              remove
            </q-btn>
            <q-btn @click="confirm"
              color="blue-8"
              :disable="loading || !captureReady"
              outline
              size="small"
            >
              add
            </q-btn>
          </template>
        </q-input>
      </q-form>
      <simple-chart :captures="[previewCapture]" :mini="true" />
    </q-card-section>
  </q-card>
</template>

<script>
import { mapState } from 'vuex';
import { readParse } from '@/data/parseCapture';
import { requiredKeys, optionalKeys } from '@/data/runKeys';
import SimpleChart from '../SimpleChart.vue';

const validationKeys = ['Name', 'CPU', 'GPU', 'RAM', 'Res', 'Preset', 'Upscale']
  .map((key) => `is${key}Valid`);

const types = ['FSR', 'DLSS'];
const options = ['quality', 'balance', 'performance'];

const upOps = [];

types.forEach((type) => {
  options.forEach((op) => {
    upOps.push(`${type}-${op}`);
  });
});

export default {
  name: 'FileUploader',
  components: {
    SimpleChart,
  },
  props: ['mini', 'loading'],
  data: () => ({
    localFile: null,
    localFiles: null,
    CPU: null,
    GPU: null,
    RAM: null,
    resolution: null,
    resOptions: ['720p', '1080p', '1440p', 'WQHD', '4K'],
    syncCap: null,
    syncCapOptions: [null, 40, 60, 120, 144, 165],
    gamePreset: null,
    presetOptions: ['low', 'medium', 'high', 'ultra'],
    upscale: 'off',
    upscaleOptions: ['off', ...upOps],
    comment: null,
    gameName: null,
    parsed: null,
    creationDate: null,
    driver: null,
    previewCapture: null,
    currentFile: null,
    captureReady: false,
  }),
  computed: {
    ...mapState(['currentUser', 'userRuns']),
    metaPicks() {
      const picks = {};
      if (this.parsed) {
        [...requiredKeys, ...optionalKeys].forEach((type) => {
          const value = this.parsed.info[type];
          if (value) picks[type] = value;
        });
      }
      return picks;
    },
    isNameValid() {
      return !!this.gameName;
    },
    isCPUValid() {
      return !!this.CPU;
    },
    isGPUValid() {
      return !!this.GPU;
    },
    isRAMValid() {
      return !!this.RAM;
    },
    isResValid() {
      const { resolution, resOptions } = this;
      return resOptions.includes(resolution);
    },
    isPresetValid() {
      const { gamePreset, presetOptions } = this;
      return presetOptions.includes(gamePreset);
    },
    isUpscaleValid() {
      const { upscale, upscaleOptions } = this;
      return upscaleOptions.includes(upscale);
    },
  },
  watch: {
    async localFile(newFile) {
      if (newFile) {
        console.log('reading new file');
        const newParsed = await readParse(newFile);
        this.parsed = newParsed;
      } else {
        this.parsed = null;
      }
    },
    parsed(newParsed) {
      if (newParsed && newParsed.info) {
        [...requiredKeys, ...optionalKeys].forEach((key) => {
          if (newParsed.info[key]) this[key] = newParsed.info[key];
          else this[key] = null;
        });
        this.sendPreview();
      } else {
        this.$emit('newPreview', null);
      }
    },
    async localFiles(newFiles) {
      let parsed = null;
      if (newFiles) {
        if (newFiles.length > 0) {
          this.currentFile = newFiles[0].name;
          parsed = await readParse(newFiles[0]);
        } else this.currentFile = null;
      }
      if (parsed && parsed.info) {
        [...requiredKeys, ...optionalKeys].forEach((key) => {
          if (parsed.info[key]) this[key] = parsed.info[key];
          else this[key] = null;
        });
        console.log('sending preview', parsed);
        this.setPreview(parsed);
      } else this.previewCapture = null;
    },
    userRuns() {
      this.localFile = null;
    },
  },
  methods: {
    setPreview(parsed) {
      this.previewCapture = parsed;
    },
    sendPreview() {
      const {
        parsed, CPU, GPU, RAM, resolution, gamePreset, upscale, gameName, syncCap, comment,
      } = this;
      if (!parsed) this.$emit('newPreview', null);
      else {
        const userId = this.currentUser ? this.currentUser.uid : null;
        const captureData = {
          userId,
          CPU,
          GPU,
          RAM,
          resolution,
          syncCap,
          gameName,
          gamePreset,
          upscale,
          comment,
          frameTimes: parsed.frameTimes,
        };
        console.log('sending preview', captureData);
        // this.$emit('newPreview', captureData);
      }
    },
    validateKeys(key, newVal) {
      if (!newVal) {
        this.$emit('formError');
        this.captureReady = false;
        return;
      }
      const otherKeys = validationKeys.filter((k) => k !== key);
      const isOtherValid = otherKeys.every((k) => this[k]);
      if (!isOtherValid) {
        this.$emit('formError');
        this.captureReady = false;
        return;
      }
      this.sendPreview();
      this.$emit('formValidated');
      this.captureReady = true;
    },
    testInvalid() {
      this.gamePreset = null;
    },
    confirm() {
      if (this.loading) throw Error('loading');
      const {
        previewCapture, CPU, GPU, RAM, resolution, gamePreset, upscale, gameName, syncCap, comment,
      } = this;
      const userId = this.currentUser ? this.currentUser.uid : null;
      const captureData = {
        userId,
        CPU,
        GPU,
        RAM,
        resolution,
        syncCap,
        gameName,
        gamePreset,
        upscale,
        comment,
        frameTimes: previewCapture.frameTimes,
      };
      this.$emit('newUpload', captureData);
      this.localFiles = this.localFiles.slice(1);
    },
  },
  created() {
    const { validateKeys } = this;
    validationKeys.forEach((key) => {
      this.$watch(key, (newVal) => {
        validateKeys(key, newVal);
      });
    });
  },
};
</script>
