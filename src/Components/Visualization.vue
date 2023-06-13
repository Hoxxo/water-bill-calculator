<script setup lang="ts">
import {Chart, Scatter} from 'vue-chartjs'
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, PointElement, Title, Tooltip} from 'chart.js'
import {onMounted, ref} from 'vue';
import { type DataSet, type DataWrapper as ChartData } from "./ts-functions/types";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement)

const chartData = ref<LineWrapper | null>(null);
const chartOptions = ref({
  type: 'line',
  responsive: true,
});

interface LineData extends Omit<DataSet, 'data'> {
  data: number[]
}

interface LineWrapper extends Omit<ChartData, 'datasets'> {
  datasets: LineData[]
}

const transform_data = (data: ChartData): LineWrapper => {
  const datasets: LineData[] = data.datasets.map((dataset: DataSet) => {
    const data: number[] = dataset.data.map((point) => point.y);
    return {
      ...dataset,
      data
    }
  });
  return {
    ...data,
    datasets
  }
}

onMounted(async () => {
  await fetch('http://localhost:5200/data', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(async (res) => {
    chartData.value = transform_data(await res.json());
    console.log(chartData.value); // For debugging
  });
});
</script>

<template>
  <Scatter v-if="chartData" :data="chartData" :options="chartOptions"/>
</template>