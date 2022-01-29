<template>
    <div class="p-relative" style="height: 90%">
        <div
            v-show="loaded"
            :class="forcedHeight ? null : (fixedHeight ? 'fixed-height-chart' : 'not-fixed')"
            :id="'chart-container-'+title"
            :style="padding ? {
                'position': 'relative',
                'padding-left': '50px',
                'padding-right': '50px',
                'height': forcedHeight ? `${forcedHeight} !important` : '450px',
                'width': null,
            } : {
                'position': 'relative',
                'padding-left': '0px',
                'padding-right': '0px',
                'height': forcedHeight ? `${forcedHeight} !important` : '100%',
                'width': '100%'
            }">
            <canvas :id="`${title}`"></canvas>
        </div>

        <v-overlay absolute color="white" :value="!loaded">
            <v-progress-circular color="primary" indeterminate size="64" width="2" />
        </v-overlay>
    </div>
</template>

<script>
import { dataConvertDict } from './ChartData.js'
import { getHeadersWithAccessToken } from '../variables.js'
import ChartClass from '../chart/ChartClass.js'
import axios from '@/services/axios.js'

const overTimeTitles = ['stock_cover', 'popularity_differences', 'cover_outliers', 'cover_differences', 'option_differences']
export default {
    props: ['endpoint', 'title', 'params', 'padding', 'fixedHeight', 'forcedHeight'],
    data () {
        return {
            loaded: false,
            chartData: {}
        }
    },
    methods: {
        redrawGraph (optionKey = undefined) {
            this.loaded = false
            let updatedEndpoint = this.endpoint
            if (this.endpoint === 'stock/predictions/') {
                if (this.$store.state.stockProposal.predictionChartWeekly === false) {
                    updatedEndpoint += 'options_daily'
                } else {
                    updatedEndpoint += 'options_weekly'
                }
            }

            const ctx = document.getElementById(`${this.$props.title}`).getContext('2d')
            let params = JSON.parse(JSON.stringify(this.$props.params))
            params['format'] = 'doa'
            if (optionKey !== undefined) {
                params['option_key'] = optionKey
            }

            if (overTimeTitles.includes(this.$props.title)) {
                let alls = this.$store.state.stockHierarchy.groups.filter(function (item) { return item === 'All' }).length - 1
                params = {
                    weeks: this.$store.state.stockAnalytics.overtimeWeeksBack,
                    depth: String(this.$store.state.stockHierarchy.depth - alls),
                    group: this.$store.state.stockHierarchy.groups[this.$store.state.stockHierarchy.depth - alls],
                    format: 'doa',
                }
            }
            if (this.endpoint !== 'projection' && this.endpoint !== 'order') {
                axios.post(((this.$store.state.general.devMode === true) ? process.env.VUE_APP_API_DATA_BASE_URL_DEV : process.env.VUE_APP_API_DATA_BASE_URL) + '/' + updatedEndpoint, params, { headers: getHeadersWithAccessToken() })
                    .then(response => {
                        this.chartData = response.data
                        // endpoint returns empty array if no data, but returns object with keys if data exists
                        if (!Object.keys(this.chartData.data).length) {
                            this.$emit('loaded', { isEmpty: true })
                        } else {
                            var chartData = dataConvertDict[this.$props.title](this.chartData)
                            // eslint-disable-next-line
                            this.chart.delete()
                            this.chart = new ChartClass(ctx, chartData['labels'], chartData['data'], chartData['scales'], chartData['type'], chartData['lineToday'], chartData['lineTodayColor'], chartData['daysCover'], chartData['week'], chartData['legend'])
                            this.$emit('loaded')
                            this.loaded = true
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
            } else {
                if (this.endpoint === 'projection') {
                    params['version'] = this.$store.state.stockArticles.articleSettings.version
                    params['store_keys'] = this.$store.state.stockArticles.articleSettings.store_keys
                    // params['params'] = this.$store.state.stockProposal.proposalSetting.parameters
                    // console.log("Projection call", params)
                }

                axios.post(((this.$store.state.general.devMode === true) ? process.env.VUE_APP_API_LOGIC_BASE_URL_DEV : process.env.VUE_APP_API_LOGIC_BASE_URL) + '/' + this.endpoint, params, { headers: getHeadersWithAccessToken() })
                    .then(response => {
                        this.chartData = { data: response.data, keys: Object.keys(response.data) }
                        if (!Object.keys(this.chartData).length) {
                            this.$emit('loaded', { isEmpty: true })
                        } else {
                            const chartData = dataConvertDict[this.$props.title](this.chartData.data)

                            if (params.order_parameters) {
                                chartData.daysCover = params.order_parameters.leadtime * 7
                            }

                            this.chart.delete()
                            this.chart = new ChartClass(ctx, chartData['labels'], chartData['data'], chartData['scales'], chartData['type'], chartData['lineToday'], chartData['lineTodayColor'], chartData['daysCover'], chartData['week'], chartData['legend'])
                            this.$emit('loaded')
                            this.loaded = true
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
            var container = document.getElementById('chart-container-' + this.$props.title)
            // Some charts need a different height
            if (this.$props.title === 'prediction' || this.$props.title === 'popularity') {
                container.style.height = '430px'
            } else if (['trend_graph', 'transfers_profit_chart', 'transfers_pieces_chart'].includes(this.$props.title)) {
                container.style.height = '370px'
            } else {
                container.style.height = '350px'
            }
        }
    },
    mounted () {
        let updatedEndpoint = this.endpoint
        var ctx = document.getElementById(`${this.$props.title}`).getContext('2d')
        let params = JSON.parse(JSON.stringify(this.$props.params))
        params['format'] = 'doa'
        if (overTimeTitles.includes(this.$props.title)) {
            let alls = this.$store.state.stockHierarchy.groups.filter(function (item) { return item === 'All' }).length - 1
            params = {
                weeks: this.$store.state.stockAnalytics.overtimeWeeksBack,
                depth: String(this.$store.state.stockHierarchy.depth - alls),
                group: this.$store.state.stockHierarchy.groups[this.$store.state.stockHierarchy.depth - alls],
                format: 'doa',
            }
        }
        if (this.endpoint !== 'projection' && this.endpoint !== 'order') {
            axios.post(((this.$store.state.general.devMode === true) ? process.env.VUE_APP_API_DATA_BASE_URL_DEV : process.env.VUE_APP_API_DATA_BASE_URL) + '/' + updatedEndpoint, params, { headers: getHeadersWithAccessToken() })
                .then(response => {
                    this.chartData = response.data
                    // endpoint returns empty array if no data, but returns object with keys if data exists
                    if (!Object.keys(this.chartData.data).length) {
                        this.$emit('loaded', { isEmpty: true })
                    } else {
                        var chartData = dataConvertDict[this.$props.title](this.chartData)

                        this.chart = new ChartClass(ctx, chartData['labels'], chartData['data'], chartData['scales'], chartData['type'], chartData['lineToday'], chartData['lineTodayColor'], chartData['daysCover'], chartData['week'], chartData['legend'])

                        this.$emit('loaded')
                        this.loaded = true
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        } else {
            if (this.endpoint === 'projection') {
                params['version'] = this.$store.state.stockArticles.articleSettings.version
                params['store_keys'] = this.$store.state.stockArticles.articleSettings.store_keys
                // params['params'] = this.$store.state.stockProposal.proposalSetting.parameters
                // console.log("Projection call", params)
            }
            axios.post(((this.$store.state.general.devMode === true) ? process.env.VUE_APP_API_LOGIC_BASE_URL_DEV : process.env.VUE_APP_API_LOGIC_BASE_URL) + '/' + this.endpoint, params, { headers: getHeadersWithAccessToken() })
                .then(response => {
                    this.chartData = { data: response.data, keys: Object.keys(response.data) }
                    if (!Object.keys(this.chartData).length) {
                        this.$emit('loaded', { isEmpty: true })
                    } else {
                        const chartData = dataConvertDict[this.$props.title](this.chartData.data)

                        if (params.order_parameters) {
                            chartData.daysCover = params.order_parameters.leadtime * 7
                        }

                        // eslint-disable-next-line
                        this.chart = new ChartClass(ctx, chartData['labels'], chartData['data'], chartData['scales'], chartData['type'], chartData['lineToday'], chartData['lineTodayColor'], chartData['daysCover'], chartData['week'], chartData['legend'])
                        this.$emit('loaded')
                        this.loaded = true
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
        var container = document.getElementById('chart-container-' + this.$props.title)
        // Some charts need a different height
        if (this.$props.title === 'prediction' || this.$props.title === 'popularity') {
            container.style.height = '430px'
        } else if (['trend_graph', 'transfers_profit_chart', 'transfers_pieces_chart'].includes(this.$props.title)) {
            container.style.height = '370px'
        } else {
            container.style.height = '350px'
        }
    }
}
</script>

<style scoped>
.fixed-height-chart {
    height: 450px !important;
}
.not-fixed {
    height: 400px !important;
}

.progress {
    width: 100%;
    min-height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
