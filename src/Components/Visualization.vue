<template>
  <div>
    <line-chart :chart-data="chartData"></line-chart>
  </div>
</template>

<script>
import { Line } from 'vue-chartjs'
import { reactiveProp } from 'vue-chartjs/es/mixins/index.js'

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['options'],
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
</script>