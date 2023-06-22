<template>
  <link href="https://fonts.googleapis.com/css?family=Zen+Maru+Gothic" rel="stylesheet" />
  <div class="font-zen text-cpt-text text-2xl p-4 min-h-fit">
    <p> 合計使用水道量: <span class="text-pink">{{total}}mL</span> </p>
    <p>料金: <span class="text-pink">{{result}}円</span></p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import calculate from './ts-functions/calculator'
import { type DataWrapper as APIResponse, type DataSet as ChartDataSet, DataWrapper } from "./ts-functions/types";

class APIOperations implements APIResponse {
  datasets: ChartDataSet[]

  constructor(datasets: ChartDataSet[]) {
    this.datasets = datasets
  }

  sum_Y_values(): number {
    return this.datasets[0].data.reduce((a, b) => a + b.y, 0)
  }
}

const fetch_data = async (): Promise<APIOperations | null> => {
  try {
    const response = await fetch('http://localhost:5200/data', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data: DataWrapper = await response.json()
    return new APIOperations(data.datasets)
  } catch (err: Error) {
    console.error(`It broke here ${err.stack}`)
    return null
  }
}

const response = ref<APIOperations | null>(null)
const yValue = ref<number | null>(0)
const result = ref<number | null>(0)
const total = ref<number | null>(0)

const convert_millilitre_to_cubic_metre = (value: number): number => {
  return value / 1000000
}

const fetchData = async () => {
  response.value = await fetch_data()
  total.value = response.value?.sum_Y_values() || null
  yValue.value = convert_millilitre_to_cubic_metre(total.value || 0)
  result.value = calculate(yValue.value || 0)
}

onMounted(async () => {
  await fetchData()
})
</script>

<style scoped>

</style>
