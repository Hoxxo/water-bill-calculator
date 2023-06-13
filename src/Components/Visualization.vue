<script setup lang="ts">
import { Line } from 'vue-chartjs'
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, PointElement, Title, Tooltip, LineController, LineElement } from 'chart.js'
import { ref, onMounted } from 'vue';
import { Coordinate, DataSet, DataWrapper } from './ts-functions/types';
import catppuccin from "./ts-functions/themes";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineController, LineElement)

interface LineData extends Omit<DataSet, 'data'> {
  data: number[]
  borderColor: string
  tension: number
  fill: boolean
}

interface LineWrapper extends Omit<DataWrapper, 'datasets'> {
  datasets: LineData[]
  labels: string[]
}

const transform_data = (data: DataWrapper): LineWrapper => {
  const labels = Array.from({ length: 24 }, (_, i) => i.toString());
  return {
    labels: labels,
    datasets: data.datasets.map(dataset => ({
      ...dataset,
      data: dataset.data.map((coordinate: Coordinate) => coordinate.y),
      borderColor: catppuccin.dark.purple,
      tension: 0.1,
      fill: false
    }))
  }
}


const chartData = ref<LineWrapper | null>(null);
const chartOptions = ref({
  responsive: true,
})

onMounted(async () => {
  await fetch('http://localhost:5200/data', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(async (res) => {
    const data = await res.json();
    chartData.value = transform_data(data);
    console.log(chartData.value); // For debugging
  })
})
</script>

<template>
  <Line v-if="chartData" :data="chartData" :options="chartOptions"/>
</template>
