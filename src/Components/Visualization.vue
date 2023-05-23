<template>
    <Scatter :data="chartData" :options="chartOptions"/>
</template>

<script lang="ts">
import {Scatter} from 'vue-chartjs'
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, PointElement, Title, Tooltip} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement)

export default {
    name: 'Scatter Chart',
    components: {Scatter},
    data() {
        return {
            chartData: {
                datasets: [
                    {
                        label: 'Data One',
                        backgroundColor: '#f87979',
                        data: []
                    }
                ]
            },
            chartOptions: {
                responsive: true,
            }
        }
    },

    mounted() {
        fetch('http://localhost:5200/data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(response => response.json())
          .then(data => {
            this.chartData.datasets[0].data = data
          })
          .catch((error) => {
            console.error('Error:', error);
          });
    },
}
</script>