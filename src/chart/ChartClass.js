import Chart from "chart.js";
import { addDays, format, getISOWeek } from "date-fns";
import { formatAxisTicks, chartColors,hexToRgbA } from "./utils";
Chart.Tooltip.positioners.custom = function (elements, eventPosition) {
	return {
		x: eventPosition.x,
		y: eventPosition.y,
	};
};

export default class ChartClass {
	constructor (ctx, labels, data, scaleData, type = "line", lineToday = false, lineTodayColor = "#E35500", daysCover = 0, week = false, legend = null) {
		const datasets = ChartClass.handleData(data);
		const scales = ChartClass.handleScales(scaleData);
		const annotation = {
			drawTime: "afterDatasetsDraw",
			annotations: [],
		};

		if (lineToday) {
			const coverEnd = addDays(new Date(), daysCover);
			const lineTodayLabel = week
				? "W" + getISOWeek(coverEnd)
				: format(coverEnd, "dd MMM");

			annotation["annotations"].push(
				{
					type: "line",
					mode: "vertical",
					scaleID: "X",
					value: lineTodayLabel,
					borderColor: lineTodayColor,
					borderWidth: 2,
					borderDash: [5, 10],
					label: {
						display: false
					}
				}
			);
		}

		const chartOptions = {
			type: type,
			data: {
				datasets,
				labels: labels.map(label => {
					return label;
				})
			},
			options: {
				pointStyle: "line",
				legend: {
					position: "bottom",
					align: "center",
					display: true,
					labels: {
						usePointStyle: true,
					}
				},
				responsive: true,
				maintainAspectRatio: false,
				hover: {
					mode: "index",
					intersect: false,
				},
				tooltips: {
					enabled: true,
					position: "custom",
					callbacks: {
						// this callback is used to create the tooltip label
						label: function (tooltipItem, data) {
							return data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].toLocaleString();
						}
					}

				},
				scales: {
					xAxes: scales.xAxes,
					yAxes: scales.yAxes
				},
				annotation,
			}
		};

		if (legend && legend.labels && legend.labels.generateLabels) {
			chartOptions.options.legend.labels.generateLabels = legend.labels.generateLabels;
		}
		this.chart = new Chart(ctx, chartOptions);
	}

	static handleData (data) {
		return data.map((item, index) => {
			return {
				type: item.type,
				yAxisID: item.yAxisID,
				label: item.label,
				data: item.data,
				fill: "fill" in item ? item.fill : true,
				backgroundColor: "backgroundColor" in item ? hexToRgbA(item.backgroundColor, 0.3) : hexToRgbA(chartColors[index], 0.3),
				borderColor: "borderColor" in item ? hexToRgbA(item.borderColor, 1) : hexToRgbA(chartColors[index], 1),
				borderWidth: 2,
				lineTension: "lineTension" in item ? item.lineTension : 0.4,
				radius: "radius" in item ? item.radius : 0,
				borderDash: "borderDash" in item ? item.borderDash : [0, 0],
				showLine: item.showLine,
				pointRadius: item.pointRadius || null,
			};
		});
	}

	static handleScales (scales) {
		let returnData = { "yAxes": [], "xAxes": [] };
		for (let y of scales.yAxes) {
			let ax = {
				id: y.id,
				stacked: y.stacked,
				position: y.position,
				scaleLabel: {
					display: true,
					labelString: y.label,
					fontSize: 14,
				},
				gridLines: {
					display: y.id === "A",
					drawTicks: false,
				},
				ticks: {
					maxTicksLimit: (y.ticks && y.ticks.maxTicksLimit) || undefined,
					fontSize: 14,
					padding: 16,
					min: "min" in y ? y.min : 0,
					max: "max" in y ? y.max : undefined,
					suggestedMax: (y.ticks && y.ticks.suggestedMax) || undefined,
					callback: (y.ticks && y.ticks.callback) || formatAxisTicks,
				}
			};
			returnData["yAxes"].push(ax);
		}
		let ax = {
			id: "X",
			stacked: scales.xAxes.stacked,
			scaleLabel: {
				display: true,
				labelString: scales.xAxes.label,
				fontSize: 14
			},
			gridLines: {
				display: false,
			},
			ticks: {
				padding: 10,
				fontSize: 14,
				beginAtZero: true,
				userCallback: function (item, index) {
					if (!(index % 0)) return item;
				},
				display: !("showXLabels" in scales.xAxes)
			}
		};
		returnData["xAxes"].push(ax);

		return returnData;
	}

	update (labels, data, type) {
		this.chart.type = type;
		this.chart.data.labels = labels;
		this.chart.data.datasets = ChartClass.handleData(data);
		this.chart.update();
	}

	delete () {
		this.chart.destroy();
	}
}
