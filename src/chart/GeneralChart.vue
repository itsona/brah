<template>
    <div>
        <div class="chart-container" :id="'chart-container-' + title" :style="{'position': 'relative', 'padding-left': '0px', 'padding-right': '0px', 'height': '520px', 'width': null}">
            <canvas :id="`${title}`"></canvas>
        </div>
    </div>
</template>

<script>
import { dataConvertDict } from './ChartData.js'
import ChartClass from './ChartClass.js'

export default {
    props: ['title', 'params', 'orderData'],
    data () {
        return {
            chart: null
        }
    },
    components: {
    },
    methods: {
        redrawGraph () {
            const ctx = document.getElementById(`${this.title}`).getContext('2d')
            const chartData = dataConvertDict[this.title](this.orderData)

            if (this.params.order_parameters) {
                chartData.daysCover = this.params.order_parameters.leadtime * 7
            }

            if (this.chart) {
                this.chart.delete()
                this.chart = null
            }

            this.chart = new ChartClass(ctx, chartData['labels'], chartData['data'], chartData['scales'], chartData['type'], chartData['lineToday'], chartData['lineTodayColor'], chartData['daysCover'], chartData['week'])
        }
    },
    mounted () {
        this.redrawGraph()
    }
}
</script>

<style scoped>
.fixed-height-chart {
    height: 450px !important;
}
</style>
