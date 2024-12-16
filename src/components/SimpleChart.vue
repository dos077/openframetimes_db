<template>
  <q-card flat :bordered="!mini">
    <q-card-section>
      <canvas :id="chartId" />
    </q-card-section>
    <q-separator />
    <q-card-actions v-if="!mini">
      <q-space />
      <q-btn size="md" flat @click="exportChart()">export</q-btn>
    </q-card-actions>
  </q-card>

</template>

<script>
import Chart from 'chart.js/auto';
import { groupCaptures } from '@/data/parseCapture';
import { mapState } from 'vuex';
import Plotter from '../data/plotChart';
import {
  makeOptions,
  setAspect,
  setScales,
  setPluginsTitle,
  setPluginsTooltip,
  setPluginsBackground,
} from '../styles/chartOptions';

const mainColors = [
  { r: 57, g: 73, b: 171 },
  { r: 244, g: 81, b: 30 },
];

const charts = {};

export default {
  name: 'SimpleChart',
  props: ['captures', 'captureGroups', 'refKeys', 'mini'],
  data: () => ({
    chart: null,
    chartData: null,
    chartTitle: null,
    plotter: Plotter(),
    exponent: null,
    expOptions: [1.25, 1.5, 2, 3, 5],
    chartId: `chart-${(new Date()).getTime()}`,
    screenWidth: document.documentElement.clientWidth,
  }),
  computed: {
    ...mapState('chart', ['chartBase', 'chartMax']),
  },
  watch: {
    captures(newCaptures) {
      this.drawChart(newCaptures);
    },
    captureGroups(newGroups) {
      this.drawChart(null, newGroups);
    },
    screenWidth: {
      immediate: true,
      handler(newVal) {
        if (newVal > 999) {
          this.$store.commit('chart/setMax', 9);
          this.$store.commit('chart/setBase', 0.5);
        } else {
          this.$store.commit('chart/setMax', 5);
          this.$store.commit('chart/setBase', 0.25);
        }
      },
    },
    refKeys: {
      immediate: true,
      handler(newKeys) {
        this.plotter.setRefKeys(newKeys);
      },
    },
    chartBase(newVal, oldVal) {
      if (newVal !== oldVal) {
        if (this.captures) {
          this.drawChart(this.captures);
        } else if (this.captureGroups) {
          this.drawChart(null, this.captureGroups);
        }
      }
    },
  },
  methods: {
    drawChart(newCaptures, newGroups) {
      const {
        plotter, refKeys, chartBase, chartMax,
      } = this;
      let plotted = null;
      if (newCaptures && newCaptures.length) {
        plotted = plotter.plotGroups(
          [groupCaptures(newCaptures, refKeys)],
          null,
          chartBase,
          chartMax,
        );
      } else if (newGroups && newGroups.length) {
        plotted = plotter.plotGroups(
          newGroups,
          mainColors,
          chartBase,
          chartMax,
        );
      } else {
        return;
      }
      console.log('plotting new chart', plotted);
      if (charts[this.chartId]) {
        this.updateChart(plotted);
      } else {
        this.newChart(plotted);
      }
    },
    updateChart({ chartData, chartTitle }) {
      const chart = charts[this.chartId];
      chart.clear();
      chart.destroy();
      this.newChart({ chartData, chartTitle });
    },
    newChart({ chartData, chartTitle }) {
      const {
        mini, chartId, chartBase, chartMax,
      } = this;
      const ctx = document.getElementById(chartId);
      console.log('drawing on canvas', ctx);
      let options = makeOptions();
      options = setAspect({ options, chartMax });
      options = setScales({ options, chartBase, chartMax });
      options = setPluginsTitle({ options, mini, chartTitle });
      options = setPluginsTooltip({ options, chartBase, chartMax });
      options = setPluginsBackground({ options, color: '#FFF' });
      const newChart = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options,
        plugins: [
          {
            id: 'background',
            beforeDraw: (chart, args, opts) => {
              const context = chart.canvas.getContext('2d');
              context.save();
              context.globalCompositeOperation = 'destination-over';
              context.fillStyle = opts.color;
              context.fillRect(0, 0, chart.width, chart.height);
              context.restore();
            },
          },
        ],
      });
      charts[chartId] = newChart;
    },
    async exportChart() {
      this.pictureMode = true;
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((r) => setTimeout(r, 200));
      const canvas = document.getElementById(this.chartId);
      const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
      const element = document.createElement('a');
      const filename = 'frameTimes.png';
      element.setAttribute('href', image);
      element.setAttribute('download', filename);
      element.click();
      this.pictureMode = false;
    },
    getScreenWidth() {
      this.screenWidth = document.documentElement.clientWidth;
    },
  },
  mounted() {
    // this.exponent = this.plotter.getExponent();
    window.addEventListener('resize', this.getScreenWidth);
    if (this.captures) this.drawChart(this.captures);
    else if (this.captureGroups) this.drawChart(null, this.captureGroups);
  },
  beforeUnmount() {
    if (charts[this.chartId]) {
      charts[this.chartId].destroy();
      charts[this.chartId] = null;
    }
    window.removeEventListener('resize', this.getScreenWidth);
  },
};
</script>
