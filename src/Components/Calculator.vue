<template>
  <link href="https://fonts.googleapis.com/css?family=Zen+Maru+Gothic" rel="stylesheet" />
  <div class="font-zen text-cpt-text px-auto text-2xl p-4 min-h-fit inline-block border-2 rounded-xl latte border-lavender">
    <p> 合計使用水道量: <span class="text-pink">{{total}}mL</span></p>
    <p>料金: <span class="text-pink">{{result}}円</span></p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import calculate from './ts-functions/calculator'
import {
  type DataWrapper as APIResponse,
  type DataSet as ChartDataSet,
  type DataWrapper,
  BarWrapper
} from "./ts-functions/types";
import { DataType } from "./ts-functions/types"
import { watch } from 'vue'
import { useStore } from 'vuex'
import { computed } from 'vue';
import { type Store } from './store'

let store = useStore<Store>()
let isWeekData = computed(() => store.state.isWeekData);

class APIOperations implements APIResponse {
  datasets: ChartDataSet[]

  constructor(datasets: ChartDataSet[]) {
    this.datasets = datasets
  }

  sum_Y_values(): number {
    let total_sum = 0;
    this.datasets.forEach(dataset => {
      total_sum += dataset.data.reduce((acc, curr) => acc + curr.y, 0)
    })

    return total_sum
  }
}


watch(isWeekData, async (newVal, _) => {
  console.log(newVal)
  await fetchData();
})

const isBarWrapper = (data: APIOperations | BarWrapper): data is BarWrapper => 'labels' in data;

const fetch_data = async (): Promise<APIOperations | BarWrapper | null> => {
  try {
    const response = await fetch('http://localhost:5200/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(<DataType>{
        dataType: store.state.isWeekData ? DataType.WEEK : DataType.DAY,
      }),
    })

    const data: DataWrapper | BarWrapper = await response.json();
    if (store.state.isWeekData && 'labels' in data) {
      // TypeScript now knows data is BarWrapper
      return data;
    } else {
      return new APIOperations((data as DataWrapper).datasets)
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(`It broke here ${err.stack}`)
    }
    return null;
  }
}

const yValue = ref<number | null>(0)
const result = ref<number | null>(0)
const total = ref<number | null>(0)

const convert_millilitre_to_cubic_metre = (value: number): number => {
  return value / 1000000
}

// Modify fetchData function
const fetchData = async () => {
  const response = await fetch_data();
  console.log(response);
  if (response) {
    if (isBarWrapper(response)) {
      // TypeScript now knows `response` is `BarWrapper` here
      console.log(response.datasets)
      total.value = response.datasets.reduce((sum, dataset) => sum + dataset.data.reduce((acc, value) => acc + value, 0), 0);
    } else {
      // TypeScript now knows `response` is `APIOperations` here
      total.value = response.sum_Y_values();
    }

    yValue.value = convert_millilitre_to_cubic_metre(total.value || 0);
    result.value = calculate(yValue.value || 0);
  } else {
    total.value = null;
    yValue.value = null;
    result.value = null;
  }
}

onMounted(async () => {
  await fetchData()
})
</script>

<style scoped>

</style>