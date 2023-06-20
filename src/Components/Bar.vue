<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import {onMounted, ref} from 'vue';
import {type Coordinate, type DataSet, type DataWrapper} from './ts-functions/types';
import catppuccin from "./ts-functions/themes";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineController, LineElement)

interface BarData extends Omit<DataSet, 'data'> {
  data: number[]
  borderColor: string
  borderWidth: number
  borderRadius: number
  fill: boolean
}

interface BarWrapper extends Omit<DataWrapper, 'datasets'> {
  datasets: BarData[]
  labels: string[]
}

const transform_data = (data: DataWrapper): BarWrapper => {
  const labels = Array.from({ length: 24 }, (_, i) => i.toString());
  return {
    labels: labels,
    datasets: data.datasets.map(dataset => ({
      ...dataset,
      data: dataset.data.map((coordinate: Coordinate) => coordinate.y),
      borderColor: catppuccin.dark.purple,
      borderWidth: 2,
      borderRadius: 5,
      fill: false
    }))
  }
}

const chartData = ref<BarWrapper | null>(null)
let delayed = false;

const chartOptions = ref({
  responsive: true,
  animations: {
    y: {
      easing: 'easeOutBack',
      from: (ctx) => {
        if (ctx.type === 'data') {
          if (ctx.mode === 'default' && !ctx.dropped) {
            ctx.dropped = true;
            return 0;
          }
        }
      }
    }
  },
  scales: {
    y: {
      ticks: {
        callback: (value: number): string => {
          return value.toString() + 'mL'
        },
        color: '#c6d0f5'
      }
    },
    x: {
      ticks: {
        callback: (value: number): string => {
          return value.toString() + '時'
        },
        color: '#c6d0f5'
      }
    }
  },
  plugins: {
    legend: {
      labels: {
        color: '#c6d0f5'
      }
    },
    // title: {
    //   display: true,
    //   text: '使用水道量',
    //   color: '#c6d0f5'
    // }
  },
})


onMounted(async () => {
  await fetch('http://localhost:5200/data', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(async (res) => {
    const data: DataWrapper = await res.json()
    chartData.value = transform_data(data)
    console.log(chartData.value) // For debugging
  }).catch(error => {
    console.error(`Error in Visualization.vue: ${error}`)
  })
})
</script>

<template>
  <div class="p-8 flex justify-center items-center">
    <Bar v-if="chartData" :data="chartData" :options="chartOptions"/>
  </div>
</template>
