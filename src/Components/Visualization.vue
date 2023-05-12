<template>
  <div>
    <line-chart :chart-data="chartData" :options="options"></line-chart>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default defineComponent({
  name: 'MyChart',
  components: {Line},
  setup() {
    const chartData = ref({
      labels: [],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [],
        },
      ],
    });

    const options = ref({
      responsive: true,
      maintainAspectRatio: false,
    });

    onMounted(async () => {
      const response = await fetch('http://localhost:5000/data');
      const data = await response.json();
      chartData.value.labels = data.labels;
      chartData.value.datasets[0].data = data.data;
    });

    return {chartData, options};
  }
});
</script>