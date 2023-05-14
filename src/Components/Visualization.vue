<template>
  <Bar
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
  />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  data() {
    const times = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
    const monData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

    const create_labels = (times) => times.map(time => time.split(':')[0]);
    const create_data = (data) => data.map(item => ({x: item}));

    return {
      chartData: {
        labels: times,
        datasets: [
            {
              label: 'time',
              data: monData,
              borderWidth: 1
            }
        ],
      },
      chartOptions: {
        responsive: true,
        scales: {
          x: {
            beginAtZero: true,
          },
        },
      },
    }
  }
}
</script>
