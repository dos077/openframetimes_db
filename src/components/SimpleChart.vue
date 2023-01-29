<template>
  <q-card flat bordered>
    <q-card-section>
      <canvas ref="chart" />
    </q-card-section>
    <q-separator />
    <q-card-actions>
      <span class="text-overline q-mr-md">exponent</span>
      <q-select :options="expOptions" v-model="exponent" />
      <q-space />
      <q-btn size="md" flat @click="exportChart()">export</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import Chart from 'chart.js/auto';
import { groupCaptures } from '@/data/parseCapture';
import plotter from '../data/plotChart';

const mainColors = [
  { r: 57, g: 73, b: 171 },
  { r: 244, g: 81, b: 30 },
];

export default {
  name: 'SimpleChart',
  props: ['captures', 'captureGroups'],
  data: () => ({
    chart: null,
    chartData: null,
    chartTitle: null,
    exponent: plotter.getExponent(),
    expOptions: [1.25, 1.5, 2, 3, 5],
  }),
  watch: {
    captures(newCaptures) {
      this.drawChart(newCaptures);
    },
    captureGroups(newGroups) {
      this.drawChart(null, newGroups);
    },
    exponent(newExp) {
      plotter.setExponent(newExp);
      if (this.captures) {
        this.drawChart(this.captures);
      } else if (this.captureGroups) {
        this.drawChart(null, this.captureGroups);
      }
    },
  },
  methods: {
    drawChart(newCaptures, newGroups) {
      let plotted = null;
      if (newCaptures && newCaptures.length) {
        plotted = plotter.plotGroups([groupCaptures(newCaptures)]);
      } else if (newGroups && newGroups.length) {
        plotted = plotter.plotGroups(newGroups, mainColors);
      } else {
        return;
      }
      const { chartData, chartTitle } = plotted;
      if (this.chart) this.chart.destroy();
      const ctx = this.$refs.chart;
      this.chart = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
          scales: {
            x: {
              display: true,
            },
            y: {
              display: true,
              ticks: {
                callback: (val) => {
                  const exponent = plotter.getExponent();
                  const deci = (Math.log(val + 1) / Math.log(10)) ** (1 / exponent);
                  return `${Math.round(deci * 1000) / 10}%`;
                },
              },
              max: 9,
            },
          },
          plugins: {
            title: {
              display: true,
              text: chartTitle,
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const val = context.parsed.y;
                  const deci = (Math.log(val + 1) / Math.log(10)) ** (1 / 2);
                  return `${context.dataset.label}, ${Math.round(deci * 10000) / 100}%`;
                },
              },
            },
            background: {
              color: '#fff',
            },
          },
        },
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
    },
    async exportChart() {
      this.pictureMode = true;
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((r) => setTimeout(r, 200));
      const canvas = this.$refs.chart;
      const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
      const element = document.createElement('a');
      const filename = 'frameTimes.png';
      element.setAttribute('href', image);
      element.setAttribute('download', filename);
      element.click();
      this.pictureMode = false;
    },
  },
  mounted() {
    if (this.captures) this.drawChart(this.captures);
    else if (this.captureGroups) this.drawChart(null, this.captureGroups);
  },
};
</script>
