<template>
  <div>
    <p>合計使用水道量: {{total}}mL</p>
    <p>料金: {{result}}円</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import calculate from './ts-functions/calculator'
import { type DataWrapper as APIResponse, type DataSet as ChartDataSet } from "./ts-functions/types";

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

    const data = await response.json()
    return new APIOperations(data.datasets)
  } catch (err) {
    console.error(err)
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

fetchData() // call the method when the component is created
</script>

<style scoped>

</style>
