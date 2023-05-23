<template>
  <Scatter v-if="chartData" :data="chartData" :options="chartOptions"/>
</template>

<script lang="ts">
import {Scatter} from 'vue-chartjs'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  PointElement,
  Title,
  Tooltip
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement)

export default {
  name: 'Scatter Chart',
  components: {Scatter},
  data() {
    return {
      chartData: null as any,
      chartOptions: {
        responsive: true,
      }
    }
  },

  async mounted() {
    await fetch('http://localhost:5200/data', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async (res) => {
      //console.log(await res.json());
      this.chartData = await res.json();
      console.log(this.chartData); // For debugging
    });
  }
}
</script>