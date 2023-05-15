<template>
    <Scatter :data="chartData" :options="chartOptions"/>
</template>

<script>
import {Scatter} from 'vue-chartjs'
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, PointElement, Title, Tooltip} from 'chart.js'
import data from './ts-functions/get-data'

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
                        data: data
                    }
                ]
            },
            chartOptions: {
                responsive: true,
            }
        }
    }
}
</script>