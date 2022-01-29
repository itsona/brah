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

    </div>
</template>

<script>
import { dataConvertDict } from "./ChartData.js";
import ChartClass from "./ChartClass.js";

export default {
	props: ["chartData", "params", "padding", "title", "fixedHeight", "forcedHeight", "dataType"],
	data () {
		return {
			loaded: true,
			chart: null,
		};
	},
	watch: {
		chartData () {
			this.drawGraph();
		},
	},
	methods: {
		drawGraph (optionKey = undefined) {
			if (!Object.keys(this.chartData).length) return;

			const ctx = document.getElementById(`${this.$props.title}`).getContext("2d");
			const chartData = dataConvertDict[this.$props.title](this.chartData);
			// when chart is for projection, "version" and "store_keys" in params is not set automatically anymore.
			if (this.chart) this.chart.delete();
			console.log(chartData);
			setTimeout(() => {
				this.chart = new ChartClass(
					ctx,
					chartData["labels"],
					chartData["data"],
					chartData["scales"],
					chartData["type"],
					chartData["lineToday"],
					chartData["lineTodayColor"],
					chartData["daysCover"],
					chartData["week"],
					chartData["legend"]);
				console.log(this.chart);
			}
			);
			this.$emit("loaded");
			this.loaded = true;
			const container = document.getElementById("chart-container-" + this.$props.title);
			if (this.$props.title === "prediction" || this.$props.title === "popularity") {
				container.style.height = "430px";
			} else if (["transfers_profit_chart", "transfers_pieces_chart"].includes(this.$props.title)) {
				container.style.height = "220px";
			} else {
				container.style.height = "350px";
			}
		},
	},
	mounted () {
		this.drawGraph();
	}
};
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
