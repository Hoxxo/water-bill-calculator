<template>
  {{response}}
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface DataPoints {
  x: number,
  y: number,
}

interface ChartDataSet {
  label: string,
  data: DataPoints[],
  backgroundColor: string,
}

interface APIResponse {
  datasets: ChartDataSet[]
}

class APIOperations implements APIResponse {
  datasets: ChartDataSet[];

  constructor(datasets: ChartDataSet[]) {
    this.datasets = datasets;
  }

  sum_Y_values(): number {
    return this.datasets.reduce((sum, dataset) => {
      return sum + dataset.data.reduce((innerSum, point) => innerSum + point.y, 0);
    }, 0)
  }
}

const fetch_data = async (): Promise<APIResponse | null> => {
  try {
    const response = await fetch('http://localhost:5200/data', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return <APIResponse>await response.json()
  } catch (err) {
    console.error(err)
    return null
  }
}

const response = ref<APIResponse | null>(null)

const fetchData = async () => {
  response.value = await fetch_data()
  console.log(response.value)
}

fetchData() // call the method when the component is created
</script>

<style scoped>

</style>
