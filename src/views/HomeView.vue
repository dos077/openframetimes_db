<template>
  <div class="home">
    <div class="row">
      <q-card style="min-width: 20rem;" class="q-ma-md">
        <q-card-section class="row q-gutter-md justify-center">
          <div class="col-10">
            <q-file v-model="localFile" label="frametime capture json" />
          </div>
          <div class="col-5">
            <q-input v-model="comment" label="comment" readonly />
          </div>
          <div class="col-5">
            <q-input v-model="gameName" label="game" readonly />
          </div>
          <div class="col-5">
            <q-input v-model="CPU" label="CPU" :disable="!localFile" />
          </div>
          <div class="col-5">
            <q-input v-model="GPU" label="GPU" :disable="!localFile" />
          </div>
          <div class="col-5">
            <q-input v-model="RAM" label="RAM" :disable="!localFile" />
          </div>
          <div class="col-5">
            <q-select v-model="resolution" :options="resOptions"
              label="resolution"
              :disable="!localFile" />
          </div>
          <div class="col-5">
            <q-select v-model="refresh" :options="refreshOptions"
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
        <q-card-actions>
          <q-btn v-if="localFile"
            col-5or="green"
            :disable="loading" @click="newCapture"
          >
            new
          </q-btn>
          <q-btn v-if="localFile && captures.length > 0"
            col-5or="blue"
            @click="addCapture" :disable="loading"
          >
            add
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
    <demo-chart :chart-data="chartData" :chart-title="chartTitle" />
  </div>
</template>

<script>
import DemoChart from '@/components/DemoChart.vue';
import { parseCapture, readCapture } from '../data/parseCapture';
import { plotMulti } from '../data/plotChart';

export default {
  name: 'HomeView',
  components: {
    DemoChart,
  },
  data: () => ({
    chartData: null,
    chartTitle: null,
    localFile: null,
    captures: [],
    loading: false,
    CPU: null,
    GPU: null,
    RAM: null,
    resolution: null,
    resOptions: [null, '720p', '1080p', '1440p', 'WQHD', '4K'],
    refresh: null,
    refreshOptions: [null, 40, 60, 120, 144, 165],
    gamePreset: null,
    presetOptions: [null, 'low', 'medium', 'high', 'ultra'],
    FSR: null,
    DLSS: null,
    upscaleOptions: [null, 'quality', 'balanced', 'performance'],
    comment: null,
    gameName: null,
    parsed: null,
  }),
  watch: {
    async localFile(newFile) {
      if (newFile) {
        const rawData = await readCapture(newFile);
        this.parsed = parseCapture(rawData);
      } else this.parsed = null;
    },
    parsed(newParsed) {
      if (newParsed && newParsed.info) {
        const {
          CPU, GPU, RAM, comment, gameName,
        } = newParsed.info;
        this.CPU = CPU;
        this.GPU = GPU;
        this.RAM = RAM;
        this.gameName = gameName;
        this.comment = comment;
      } else {
        this.CPU = null;
        this.GPU = null;
        this.RAM = null;
        this.gameName = null;
        this.comment = null;
      }
    },
  },
  methods: {
    async newCapture() {
      const {
        parsed, CPU, GPU, RAM, resolution, gamePreset, FSR, DLSS, gameName, refresh,
      } = this;
      if (!parsed) return;
      const captureData = {
        info: {
          CPU,
          GPU,
          RAM,
          resolution,
          refresh,
          gameName,
          gamePreset,
          FSR: FSR ? `FSR-${FSR}` : null,
          DLSS: DLSS ? `DLSS-${DLSS}` : null,
        },
        frameTimes: parsed.frameTimes,
      };
      this.captures = [captureData];
      this.localFile = null;
      const { chartData, chartTitle } = plotMulti(this.captures);
      this.chartTitle = chartTitle;
      this.chartData = chartData;
    },
    async addCapture() {
      const {
        parsed, CPU, GPU, RAM, resolution, gamePreset, FSR, DLSS, refresh, gameName,
      } = this;
      if (!parsed) return;
      const captureData = {
        info: {
          CPU,
          GPU,
          RAM,
          resolution,
          refresh,
          gameName,
          gamePreset,
          FSR: FSR ? `FSR-${FSR}` : null,
          DLSS: DLSS ? `DLSS-${DLSS}` : null,
        },
        frameTimes: parsed.frameTimes,
      };
      this.captures.push(captureData);
      this.localFile = null;
      const { chartData, chartTitle } = plotMulti(this.captures);
      this.chartTitle = chartTitle;
      this.chartData = chartData;
    },
  },
};
</script>
