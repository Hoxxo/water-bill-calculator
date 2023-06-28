<script setup lang="ts">
import {Bar} from 'vue-chartjs'
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
import {inject, onMounted, ref} from 'vue';
import {BarWrapper, type Coordinate, DataType, type DataWrapper} from './ts-functions/types'
import catppuccin from './ts-functions/themes'
import { type Store } from "./Store"

ChartJS.register(
    Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineController, LineElement
)

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

interface AnimationContext {
  type: string
  mode: string
  dropped: boolean
}

const chartData = ref<BarWrapper | null>(null)

interface ChartOptions {
  responsive?: boolean;
  animations?: {
    y?: {
      from?: <T>(ctx: AnimationContext) => T
      easing?: string
    }
  }
  scales?: {
    x?: {
      ticks?: {
        color?: string
        callback?: <T>(value: number) => T
      }
    }
    y?: {
      ticks?: {
        color?: string;
        callback?: <T>(value: number) => T
      }
    }
  }
  plugins?: {
    legend?: {
      labels?: {
        color?: string
      }
    }
  }
}

const chartOptionsDay = ref<ChartOptions>({
  responsive: true,
  animations: {
    y: {
      easing: 'easeOutBack',
      from: (ctx: AnimationContext): number => {
        if (ctx.type === 'data') {
          if (ctx.mode === 'default' && !ctx.dropped) {
            ctx.dropped = true
            return 0
          }
        }
        return 0
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

const chartOptionsWeek = ref<ChartOptions>({
  responsive: true,
  animations: {
    y: {
      easing: 'easeOutBack',
      from: (ctx: AnimationContext): number => {
        if (ctx.type === 'data') {
          if (ctx.mode === 'default' && !ctx.dropped) {
            ctx.dropped = true
            return 0
          }
        }
        return 0
      }
    }
  },
  scales: {
    y: {
      ticks: {
        callback: (value: number): string => {
          return value.toString() + 'mL'
        },
        color: '#c6d0f5',
      }
    },
    x: {
      ticks: {
        color: '#c6d0f5',
      }
    }
  },
  plugins: {
    legend: {
      labels: {
        color: '#c6d0f5'
      }
    },
  },
})

const chartOptions = ref<ChartOptions>()

async function day_data() {
  await fetch('http://localhost:5200/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( <DataType>{
      dataType: DataType.DAY
    })
  }).then(async res => {
    const data: DataWrapper = await res.json()
    console.log(data);
    chartData.value = transform_data(data)
    chartOptions.value = chartOptionsDay.value
  }).catch(error => {
    console.error(`Error in Visualization.vue: ${error}`)
  })
}

const week_data = async () => {
  console.log('week data requested')
  try {
    const res = await fetch('http://localhost:5200/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(<DataType>{
        dataType: DataType.WEEK
      })
    })
    chartData.value = await res.json()
    if (chartData.value) {
      (chartData.value as BarWrapper).labels = ['月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日', '日曜日']
    }
    chartOptions.value = chartOptionsWeek.value
  } catch (error) {
    console.error(`Error in Visualization.vue: ${error}`)
  }
}

const store: Store = inject('store') as Store

const toggleData = async () => {
  store.toggleData()
  if (store.state.isWeekData) {
    await week_data()
  } else {
    await day_data()
  }
}

onMounted(async () => {
  await day_data()
})
</script>

<template>
  <div class="font-zen text-cpt-text border-2 inline-block rounded-xl align-top text-2xl p-3 mx-5 latte border-lavender hover:border-teal hover:bg-teal transition ease-in-out delay-75">
    <button class="transform active:scale-90" @click="toggleData">データ切換</button>
  </div>
  <div class="p-8 flex justify-center items-center">
    <Bar v-if="chartData" :data="chartData" :options="chartOptions"/>
  </div>
</template>