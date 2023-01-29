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
    <q-card-section v-if="!mini && parsed"
      class="row q-col-gutter-sm"
    >
      <div class="col-6">
        <q-input v-model="comment" label="comment" readonly />
      </div>
      <div class="col-6">
        <q-input v-model="gameName" label="game" readonly />
      </div>
      <div class="col-6">
        <q-input v-model="CPU" label="CPU" :disable="!localFile" readonly />
      </div>
      <div class="col-6">
        <q-input v-model="GPU" label="GPU" :disable="!localFile" readonly />
      </div>
      <div class="col-6">
        <q-input v-model="RAM" label="RAM" :disable="!localFile" readonly />
      </div>
      <div class="col-6">
        <q-select v-model="resolution" :options="resOptions"
          label="resolution"
          :disable="!localFile" />
      </div>
      <div class="col-6">
        <q-select v-model="syncCap" :options="syncCapOptions"
          label="refresh rate/framecap"
          :disable="!localFile" />
      </div>
      <div class="col-6">
        <q-select v-model="gamePreset" :options="presetOptions"
          label="preset"
          :disable="!localFile" />
      </div>
      <div class="col-6">
        <q-select v-model="FSR" :options="upscaleOptions"
          label="FSR"
          :disable="!localFile" />
      </div>
      <div class="col-6">
        <q-select v-model="DLSS" :options="upscaleOptions"
          label="DLSS"
          :disable="!localFile" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapState } from 'vuex';
import { parseCapture, readCapture } from '@/data/parseCapture';
import { requiredKeys, optionalKeys } from '@/data/runKeys';

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
    ...mapState(['currentUser']),
    meatPicks() {
      const picks = {};
      if (this.parsed) {
        [...requiredKeys, ...optionalKeys].forEach((type) => {
          const name = this.parsed.info[type];
          if (name) picks[type] = name;
        });
      }
      return picks;
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
  },
};
</script>
