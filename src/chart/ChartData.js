import Chart from "chart.js";

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
					fill: true,
					backgroundColor: "#73A1C7",
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
