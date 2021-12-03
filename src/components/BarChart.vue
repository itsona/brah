<template>
  <v-container>
    <div
        id="barchart"
        class="ct-chart-bar ct-major-"
        :class="{
        'ct-major-twelfth': $vuetify.breakpoint.lgAndUp,
        'ct-major-tenth': $vuetify.breakpoint.mdOnly,
        'ct-major-sixth': $vuetify.breakpoint.smOnly,
        'ct-major-third': $vuetify.breakpoint.xsOnly
      }"
    ></div>
  </v-container>
</template>

<script>
import * as Chartist from "chartist";
import "chartist-plugin-tooltips";
import "chartist-plugin-axistitle";
import "chartist-plugin-legend";

export default {
	name: "BarChart",
	data() {
		return {
			responsiveOptions: [
				[
					"screen and (max-width: 640px)",
					{
						axisX: {
							labelInterpolationFnc: function (value) {
								return value.substr(2);
							}
						}
					}
				],
				[
					"screen and (max-width: 400px)",
					{
						axisX: {
							labelInterpolationFnc: function (value) {
								return value.substr(5);
							}
						}
					}
				]
			],
			chartist: {},
			chart_data: {
				labels: [],
				series: []
			},
			chart_options: {}
		};
	},
	props: {
		unit: {
			default() {
				return undefined;
			}
		},
		axisTitles: {
			default() {
				return {
					axisX: {
						title: "X"
					}
				};
			}
		},
		labels: {
			default() {
				return ["asd"];
			}
		},
		series: {
			default() {
				return [[1]];
			}
		},
		options: {
			default() {
				return {};
			}
		}
	},
	watch: {
		unit() {
			this.updateChart();
		},
		labels() {
			this.updateChart();
		},
		series() {
			this.updateChart();
		},
		options() {
			this.updateChart();
		},
		axisTitles() {
			this.updateChart();
		}
	},
	mounted() {
		this.chartist = new Chartist.Bar(
			"#barchart",
			this.chart_data,
			this.chart_options,
			this.responsiveOptions
		);
		this.$taxi.addEventListener("update_barchart", this.updateChart);
		this.updateChart();
	},
	methods: {
		updateChart() {
			this.chart_data.series = this.series;
			this.chart_data.labels = this.labels;
			this.chart_options = this.options;
			this.chart_options.stackBars = false;
			this.chart_options.plugins = this.getPlugins();
			this.chartist.update(this.chart_data, this.chart_options);
		},
		getPlugins() {
			return [
				Chartist.plugins.ctAxisTitle(this.axisTitles),
				Chartist.plugins.tooltip({
					currency: this.unit,
					currencyFormatCallback: (value, options) => {
						const new_value = parseFloat(value);
						if (new_value) value = new_value.toFixed(2);
						return (
							value.toLocaleString("en", {
								maximumFractionDigits: 2,
								minimumFractionDigits: 2
							}) +
                " " +
                options.currency
						);
					}
				}),
				Chartist.plugins.legend({
					clickable: true,
					position: "top"
				})
			];
		}
	}
};
</script>

<style scoped></style>
