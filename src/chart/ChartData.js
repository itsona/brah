import { format } from "date-fns";
import Chart from "chart.js";
import { chartColors } from "./utils";

const optionsExpectedChartsStock = {
	legend: {
		position: "bottom",
		align: "center",
	},
	responsive: true,
	maintainAspectRatio: false,
	scales: {
		xAxes: [
			{
				stacked: true,
				id: "bar-x-axis1",
				// barThickness: 40,
				scaleLabel: {
					display: true,
					labelString: "",
					fontSize: 14
				},
				gridLines: {
					display: false
				}
			},
			{
				display: false,
				stacked: true,
				id: "bar-x-axis2",
				label: "Test",
				// barThickness: 40,
				// these are needed because the bar controller defaults set only the first x axis properties
				type: "category",
				// categoryPercentage: 0.8,
				// barPercentage: 0.9,
				gridLines: {
					display: false
				},
				offset: true
			}
		],
		yAxes: [
			{
				stacked: false,
				gridLines: {
					display: true
				},
				id: "y-axis1",
				scaleLabel: {
					display: true,
					labelString: "Pieces",
					fontSize: 14
				},
				ticks: {
					fontSize: 14,
					padding: 16,
					min: 0,
					callback: function (value) {
						var ranges = [
							{ divider: 1e6, suffix: "M" },
							{ divider: 1e3, suffix: "k" }
						];
						function formatNumber (n) {
							for (var i = 0; i < ranges.length; i++) {
								if (n >= ranges[i].divider) {
									return (n / ranges[i].divider).toString() + ranges[i].suffix;
								}
							}
							return n;
						}
						return formatNumber(value);
					},
				}
			},
			{
				stacked: false,
				gridLines: {
					display: false
				},
				id: "y-axis2",
				position: "right",
				scaleLabel: {
					display: true,
					labelString: "Ratio",
					fontSize: 14
				},
				ticks: {
					fontSize: 14,
					min: 0,
				}
			}
		]
	}
};

const errorsCountChartStock = {
	legend: {
		position: "bottom",
		align: "center",
	},
	responsive: true,
	maintainAspectRatio: false,
	scales: {
		xAxes: [
			{
				stacked: true,
				id: "bar-x-axis1",
				// barThickness: 40,
				scaleLabel: {
					display: true,
					labelString: "",
					fontSize: 14
				},
				gridLines: {
					display: false
				}
			},
			{
				display: false,
				stacked: true,
				id: "bar-x-axis2",
				label: "Test",
				// barThickness: 40,
				// these are needed because the bar controller defaults set only the first x axis properties
				type: "category",
				// categoryPercentage: 0.8,
				// barPercentage: 0.9,
				gridLines: {
					display: false
				},
				offset: true
			}
		],
		yAxes: [
			{
				stacked: false,
				gridLines: {
					display: true
				},
				id: "y-axis1",
				scaleLabel: {
					display: true,
					labelString: "",
					fontSize: 14
				},
				ticks: {
					fontSize: 14,
					padding: 16,
					min: 0,
					callback: function (value) {
						var ranges = [
							{ divider: 1e6, suffix: "M" },
							{ divider: 1e3, suffix: "k" }
						];
						function formatNumber (n) {
							for (var i = 0; i < ranges.length; i++) {
								if (n >= ranges[i].divider) {
									return (n / ranges[i].divider).toString() + ranges[i].suffix;
								}
							}
							return n;
						}
						return formatNumber(value);
					},
				}
			},
		]
	}
};

const optionsExpectedChartsOrder = {
	legend: {
		position: "bottom",
		align: "center",
	},
	responsive: true,
	maintainAspectRatio: false,
	scales: {
		xAxes: [
			{
				stacked: true,
				id: "bar-x-axis1",
				// barThickness: 40,
				scaleLabel: {
					display: true,
					labelString: "",
					fontSize: 14
				},
				gridLines: {
					display: false
				}
			},
			{
				display: false,
				stacked: true,
				id: "bar-x-axis2",
				label: "Test",
				// barThickness: 40,
				// these are needed because the bar controller defaults set only the first x axis properties
				type: "category",
				// categoryPercentage: 0.8,
				// barPercentage: 0.9,
				gridLines: {
					display: false
				},
				offset: true
			}
		],
		yAxes: [
			{
				stacked: false,
				gridLines: {
					display: true
				},
				id: "y-axis1",
				scaleLabel: {
					display: true,
					labelString: "Pieces",
					fontSize: 14
				},
				ticks: {
					fontSize: 14,
					padding: 16,
					min: 0,
					callback: function (value) {
						var ranges = [
							{ divider: 1e6, suffix: "M" },
							{ divider: 1e3, suffix: "k" }
						];
						function formatNumber (n) {
							for (var i = 0; i < ranges.length; i++) {
								if (n >= ranges[i].divider) {
									return (n / ranges[i].divider).toString() + ranges[i].suffix;
								}
							}
							return n;
						}
						return formatNumber(value);
					},
				}
			},
			{
				stacked: false,
				gridLines: {
					display: false
				},
				id: "y-axis2",
				position: "right",
				scaleLabel: {
					display: true,
					labelString: "Weekscover",
					fontSize: 14
				},
				ticks: {
					fontSize: 14,
					min: 0,
				}
			}
		]
	}
};

export const dataConvertDict = {
	prediction_graph_weeks_order: data => {
		const expenses = data["expenses"];
		const income = data["income"];
		const sales = data["sales"];
		const labels = data["weeks"];
		return {
			labels,
			data: [
				{
					label: "sales",
					data: sales,
					radius: 0,
					yAxisID: "A",
					fill: false,
					backgroundColor: "#FFFFFF",
				},
				{
					label: "income",
					data: income,
					radius: 0,
					yAxisID: "A",
					fill: false,
					backgroundColor: "#FFFFFF",
				},
				{
					label: "expenses",
					data: expenses,
					fill: false,
					radius: 0,
					yAxisID: "A",
					borderDash: [10, 5],
					borderColor: "#FF9800",
					backgroundColor: "#FFFFFF",
				},
			],
			type: "line",
			lineToday: true,
			week: true,
			scales: {
				yAxes: [{ label: "", id: "A", position: "left" }],
				xAxes: { label: "" }
			},
			legend: {
				labels: {
					generateLabels: (chart) => {
						const labels = Chart.defaults.global.legend.labels.generateLabels(chart);
						// avg labels
						labels[2].lineDash = [5, 5];
						return labels;
					},
				}
			},
		};
	},
};
