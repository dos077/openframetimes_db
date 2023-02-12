<template>
  <q-card flat>
    <q-list v-if="mini && parsed">
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
      <q-file v-model="localFile" label="frametime capture json"
        clearable/>
    </q-card-section>
    <q-card-section v-if="!mini && parsed">
      <q-form class="row q-col-gutter-sm">
        <q-input v-model="comment" label="comment" readonly
          class="col-6"
        />
        <q-input v-model="gameName" label="game" readonly
          class="col-6"
          error-message="game name required"
          :error="!isNameValid"
          />
        <q-input v-model="CPU" label="CPU" :disable="!localFile" readonly
          class="col-6"
          error-message="CPU required"
          :error="!isCPUValid"/>
        <q-input v-model="GPU" label="GPU" :disable="!localFile" readonly
          class="col-6"
          error-message="GPU required"
          :error="!isGPUValid"/>
        <q-input v-model="RAM" label="RAM" :disable="!localFile" readonly
          class="col-6"
          error-message="RAM required"
          :error="!isRAMValid"/>
        <q-select v-model="resolution" :options="resOptions"
          label="resolution"
          :disable="!localFile"
          class="col-6"
          error-message="invalid resolution"
          :error="!isResValid"/>
        <q-select v-model="gamePreset" :options="presetOptions"
          label="preset"
          :disable="!localFile"
          class="col-6"
          error-message="invalid game preset"
          :error="!isPresetValid"/>
        <q-select v-model="FSR" :options="upscaleOptions"
          label="FSR"
          :disable="!localFile"
          class="col-6"
          error-message="invalid FSR preset"
          :error="!isFSRValid"/>
        <q-select v-model="DLSS" :options="upscaleOptions"
          label="DLSS"
          :disable="!localFile"
          class="col-6"
          error-message="invalid DLSS preset"
          :error="!isDLSSValid"/>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapState } from 'vuex';
import { parseCapture, readCapture } from '@/data/parseCapture';
import { requiredKeys, optionalKeys } from '@/data/runKeys';

const validationKeys = ['Name', 'CPU', 'GPU', 'RAM', 'Res', 'Preset', 'FSR', 'DLSS']
  .map((key) => `is${key}Valid`);

export default {
  name: 'FileUploader',
  props: ['mini'],
  data: () => ({
    localFile: null,
    loading: false,
    CPU: null,
    GPU: null,
    RAM: null,
    resolution: null,
    resOptions: ['720p', '1080p', '1440p', 'WQHD', '4K'],
    syncCap: null,
    syncCapOptions: [null, 40, 60, 120, 144, 165],
    gamePreset: null,
    presetOptions: ['low', 'medium', 'high', 'ultra'],
    FSR: null,
    DLSS: null,
    upscaleOptions: ['off', 'quality', 'balanced', 'performance'],
    comment: null,
    gameName: null,
    parsed: null,
    creationDate: null,
    driver: null,
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
    isFSRValid() {
      const { FSR, upscaleOptions } = this;
      return upscaleOptions.includes(FSR);
    },
    isDLSSValid() {
      const { DLSS, upscaleOptions } = this;
      return upscaleOptions.includes(DLSS);
    },
  },
  watch: {
    async localFile(newFile) {
      if (newFile) {
        const rawData = await readCapture(newFile);
        this.parsed = parseCapture(rawData);
      } else {
        this.parsed = null;
      }
    },
    parsed(newParsed) {
      if (newParsed && newParsed.info) {
        ['comment', ...requiredKeys, ...optionalKeys].forEach((key) => {
          if (newParsed.info[key]) this[key] = newParsed.info[key];
          else this[key] = null;
        });
        this.sendPreview();
      } else {
        this.$emit('newPreview', null);
      }
    },
    userRuns() {
      this.localFile = null;
    },
  },
  methods: {
    sendPreview() {
      const {
        parsed, CPU, GPU, RAM, resolution, gamePreset, FSR, DLSS, gameName, syncCap,
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
          FSR: FSR ? `FSR-${FSR}` : null,
          DLSS: DLSS ? `DLSS-${DLSS}` : null,
          frameTimes: parsed.frameTimes,
        };
        this.$emit('newPreview', captureData);
      }
    },
    validateKeys(key, newVal) {
      if (!newVal) {
        this.$emit('formError');
        return;
      }
      const otherKeys = validationKeys.filter((k) => k !== key);
      const isOtherValid = otherKeys.every((k) => this[k]);
      if (!isOtherValid) {
        this.$emit('formError');
        return;
      }
      console.log('form valid');
      this.sendPreview();
      this.$emit('formValidated');
    },
    testInvalid() {
      this.gamePreset = null;
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
