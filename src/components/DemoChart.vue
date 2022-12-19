<template>
  <div>
    <canvas id="demo-chart" />
  </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  name: 'DemoChart',
  props: ['chartData', 'chartTitle'],
  data: () => ({
    chart: null,
  }),
  watch: {
    chartData(newData) {
      this.drawChart(newData);
    },
  },
  methods: {
    drawChart(newData) {
      if (!newData) return;
      const { chart, chartTitle } = this;
      if (chart) chart.destroy();
      const chartData = newData;
      const ctx = document.getElementById('demo-chart');
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
    this.drawChart(this.chartData);
  },
};
</script>
