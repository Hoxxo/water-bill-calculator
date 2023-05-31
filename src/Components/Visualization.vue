<script setup lang="ts">
import {Scatter} from 'vue-chartjs'
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, PointElement, Title, Tooltip} from 'chart.js'
import { ref, onMounted } from 'vue';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement)

interface chartPoint {
  x: number,
  y: number
}

interface chartDataset {
  label: string,
  data: chartPoint[],
  backgroundColor: string,
}

interface ChartData {
  datasets: chartDataset[]
}

const chartData = ref<ChartData | null>(null);
const chartOptions = ref({
  responsive: true,
});

onMounted(async () => {
  await fetch('http://localhost:5200/data', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(async (res) => {
    chartData.value = await res.json();
    console.log(chartData.value); // For debugging
  });
});
</script>

<template>
  <Scatter v-if="chartData" :data="chartData" :options="chartOptions"/>
</template>