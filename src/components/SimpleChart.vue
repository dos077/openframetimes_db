<template>
  <div>
    <canvas ref="chart" />
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
import { plotGroups } from '../data/plotChart';

export default {
  name: 'SimpleChart',
  props: ['captures'],
  data: () => ({
    chart: null,
    chartData: null,
    chartTitle: null,
  }),
  watch: {
    captures(newCaptures) {
      this.drawChart(newCaptures);
    },
  },
  methods: {
    drawChart(newCaptures) {
      if (!newCaptures || !newCaptures.length) return;
      const { chartData, chartTitle } = plotGroups(newCaptures);
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
                  const deci = (Math.log(val + 1) / Math.log(10)) ** (1 / 2);
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
                  return `${Math.round(deci * 10000) / 100}%`;
                },
              },
            },
          },
        },
      });
    },
  },
  mounted() {
    this.drawChart(this.captures);
  },
};
</script>
