<template>
    <div>
        <v-overlay absolute color="white" :value="!loaded">
            <v-progress-circular color="primary" indeterminate size="64" width="2" />
        </v-overlay>

        <div v-show="loaded" class="chart-container" style="position: relative; height: 400px;">
            <canvas :id="title"></canvas>
        </div>
    </div>
</template>

<script>
import { dataConvertDict } from './ChartData.js'
import Chart from 'chart.js'

export default {
    props: ['title', 'chartData', 'params'],
    data () {
        return {
            loaded: false,
            chart: null
        }
    },
    watch: {
        chartData () {
            this.drawGraph()
        }
    },
    methods: {
        drawGraph () {
            this.loaded = false
            const ctx = document.getElementById(this.title).getContext('2d')
            let data = dataConvertDict[this.title](this.chartData)
            let chartData = data[0]
            let options = data[1]
            if (this.chart) {
                this.chart.destroy()
            }
            this.chart = new Chart(ctx, { type: 'bar', data: chartData, options: options })
            this.$emit('loaded')
            this.loaded = true
        }
    },
    mounted () {
        this.drawGraph()
    }
}
</script>
