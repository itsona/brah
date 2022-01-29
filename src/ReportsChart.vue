<template>
  <ChartElement
      style="width: 90%"
      title="prediction_graph_weeks_order"
      ref="prediction_graph_weeks_order"
      :params="{}"
      data-type="prediction_graph"
      :chartData="chartData"
      :padding="false"
      :fixedHeight="false"
  />
</template>

<script>
import ChartElement from "./chart/ChartElement";
export default {
	name: "ReportsChart",
	components: {ChartElement},
	data() {
		return {
			options: [],
			chartData: {},
		};
	},
	created() {
		this.options = {
			"defaultColor": "rgba(0,0,0,0.1)",
			"defaultFontColor": "#666",
			"defaultFontFamily": "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
			"defaultFontSize": 12,
			"defaultFontStyle": "normal",
			"defaultLineHeight": 1.2,
			"showLines": true,
			"animation": {
				"duration": 1000,
				"easing": "easeOutQuart"
			},
			"elements": {
				"arc": {
					"backgroundColor": "rgba(0,0,0,0.1)",
					"borderColor": "#fff",
					"borderWidth": 2,
					"borderAlign": "center"
				},
				"line": {
					"tension": 0.4,
					"backgroundColor": "rgba(0,0,0,0.1)",
					"borderWidth": 3,
					"borderColor": "rgba(0,0,0,0.1)",
					"borderCapStyle": "butt",
					"borderDash": [],
					"borderDashOffset": 0,
					"borderJoinStyle": "miter",
					"capBezierPoints": true,
					"fill": true
				},
				"point": {
					"radius": 3,
					"pointStyle": "circle",
					"backgroundColor": "rgba(0,0,0,0.1)",
					"borderColor": "rgba(0,0,0,0.1)",
					"borderWidth": 1,
					"hitRadius": 1,
					"hoverRadius": 4,
					"hoverBorderWidth": 1
				},
				"rectangle": {
					"backgroundColor": "rgba(0,0,0,0.1)",
					"borderColor": "rgba(0,0,0,0.1)",
					"borderSkipped": "bottom",
					"borderWidth": 0
				}
			},
			"datasets": {
				"bar": {
					"categoryPercentage": 0.8,
					"barPercentage": 0.9
				},
				"horizontalBar": {
					"categoryPercentage": 0.8,
					"barPercentage": 0.9
				},
				"scatter": {
					"showLine": false
				}
			},
			"layout": {
				"padding": {
					"top": 0,
					"right": 0,
					"bottom": 0,
					"left": 0
				}
			},
			"plugins": {
				"filler": {
					"propagate": true
				}
			},
			"tooltips": {
				"enabled": true,
				"custom": null,
				"mode": "nearest",
				"position": "custom",
				"intersect": true,
				"backgroundColor": "rgba(0,0,0,0.8)",
				"titleFontStyle": "bold",
				"titleSpacing": 2,
				"titleMarginBottom": 6,
				"titleFontColor": "#fff",
				"titleAlign": "left",
				"bodySpacing": 2,
				"bodyFontColor": "#fff",
				"bodyAlign": "left",
				"footerFontStyle": "bold",
				"footerSpacing": 2,
				"footerMarginTop": 6,
				"footerFontColor": "#fff",
				"footerAlign": "left",
				"yPadding": 6,
				"xPadding": 6,
				"caretPadding": 2,
				"caretSize": 5,
				"cornerRadius": 6,
				"multiKeyBackground": "#fff",
				"displayColors": true,
				"borderColor": "rgba(0,0,0,0)",
				"borderWidth": 0,
				"callbacks": {}
			},
			"events": [
				"mousemove",
				"mouseout",
				"click",
				"touchstart",
				"touchmove"
			],
			"hover": {
				"onHover": null,
				"mode": "index",
				"intersect": false,
				"animationDuration": 400
			},
			"onClick": null,
			"maintainAspectRatio": false,
			"responsive": true,
			"responsiveAnimationDuration": 0,
			"legend": {
				"display": true,
				"position": "bottom",
				"align": "center",
				"fullWidth": true,
				"reverse": false,
				"weight": 1000,
				"onHover": null,
				"onLeave": null,
				"labels": {
					"boxWidth": 40,
					"padding": 10,
					"usePointStyle": true
				}
			},
			"title": {
				"display": false,
				"fontStyle": "bold",
				"fullWidth": true,
				"padding": 10,
				"position": "top",
				"text": "",
				"weight": 2000
			},
			"spanGaps": false,
			"scales": {
				"xAxes": [
					{
						"display": true,
						"position": "bottom",
						"offset": false,
						"gridLines": {
							"display": false,
							"color": "rgba(0,0,0,0.1)",
							"lineWidth": 1,
							"drawBorder": true,
							"drawOnChartArea": true,
							"drawTicks": true,
							"tickMarkLength": 10,
							"zeroLineWidth": 1,
							"zeroLineColor": "rgba(0,0,0,0.25)",
							"zeroLineBorderDash": [],
							"zeroLineBorderDashOffset": 0,
							"offsetGridLines": false,
							"borderDash": [],
							"borderDashOffset": 0
						},
						"scaleLabel": {
							"display": true,
							"labelString": "",
							"padding": {
								"top": 4,
								"bottom": 4
							},
							"fontSize": 14
						},
						"ticks": {
							"beginAtZero": true,
							"minRotation": 0,
							"maxRotation": 50,
							"mirror": false,
							"padding": 10,
							"reverse": false,
							"display": true,
							"autoSkip": true,
							"autoSkipPadding": 0,
							"labelOffset": 0,
							"minor": {},
							"major": {},
							"fontSize": 14
						},
						"type": "category",
						"id": "X"
					}
				],
				"yAxes": [
					{
						"display": true,
						"position": "left",
						"offset": false,
						"gridLines": {
							"display": true,
							"color": "rgba(0,0,0,0.1)",
							"lineWidth": 1,
							"drawBorder": true,
							"drawOnChartArea": true,
							"drawTicks": false,
							"tickMarkLength": 10,
							"zeroLineWidth": 1,
							"zeroLineColor": "rgba(0,0,0,0.25)",
							"zeroLineBorderDash": [],
							"zeroLineBorderDashOffset": 0,
							"offsetGridLines": false,
							"borderDash": [],
							"borderDashOffset": 0
						},
						"scaleLabel": {
							"display": true,
							"labelString": "Stock",
							"padding": {
								"top": 4,
								"bottom": 4
							},
							"fontSize": 14
						},
						"ticks": {
							"beginAtZero": false,
							"minRotation": 0,
							"maxRotation": 50,
							"mirror": false,
							"padding": 16,
							"reverse": false,
							"display": true,
							"autoSkip": true,
							"autoSkipPadding": 0,
							"labelOffset": 0,
							"minor": {},
							"major": {},
							"fontSize": 14,
							"min": 0
						},
						"type": "linear",
						"id": "A"
					},
					{
						"display": true,
						"position": "right",
						"offset": false,
						"gridLines": {
							"display": false,
							"color": "rgba(0,0,0,0.1)",
							"lineWidth": 1,
							"drawBorder": true,
							"drawOnChartArea": true,
							"drawTicks": false,
							"tickMarkLength": 10,
							"zeroLineWidth": 1,
							"zeroLineColor": "rgba(0,0,0,0.25)",
							"zeroLineBorderDash": [],
							"zeroLineBorderDashOffset": 0,
							"offsetGridLines": false,
							"borderDash": [],
							"borderDashOffset": 0
						},
						"scaleLabel": {
							"display": true,
							"labelString": "Sales",
							"padding": {
								"top": 4,
								"bottom": 4
							},
							"fontSize": 14
						},
						"ticks": {
							"beginAtZero": false,
							"minRotation": 0,
							"maxRotation": 50,
							"mirror": false,
							"padding": 16,
							"reverse": false,
							"display": true,
							"autoSkip": true,
							"autoSkipPadding": 0,
							"labelOffset": 0,
							"minor": {},
							"major": {},
							"fontSize": 14,
							"min": 0,
							"suggestedMax": 152008.5
						},
						"id": "B"
					}
				]
			},
			"pointStyle": "line",
			"annotation": {
				"drawTime": "afterDatasetsDraw",
				"annotations": [
					{
						"type": "line",
						"mode": "vertical",
						"scaleID": "X",
						"value": "W4",
						"borderColor": "#E35500",
						"borderWidth": 2,
						"borderDash": [
							5,
							10
						],
						"label": {
							"display": false
						}
					}
				]
			}
		};
		this.chartData = {
			"date_keys": [
				"2022-01-21",
				"2022-01-28",
				"2022-01-30",
				"2022-02-06",
				"2022-02-13",
				"2022-02-20",
				"2022-02-27",
				"2022-03-06",
				"2022-03-13",
				"2022-03-20",
				"2022-03-27",
				"2022-04-03",
				"2022-04-10",
				"2022-04-17",
				"2022-04-24",
				"2022-05-01",
				"2022-05-08",
				"2022-05-15",
				"2022-05-22",
				"2022-05-29",
				"2022-06-05",
				"2022-06-12",
				"2022-06-19",
				"2022-06-26",
				"2022-07-03",
				"2022-07-10",
				"2022-07-17",
				"2022-07-24",
				"2022-07-31",
				"2022-08-07",
				"2022-08-14",
				"2022-08-21",
				"2022-08-28",
				"2022-09-04",
				"2022-09-11",
				"2022-09-18",
				"2022-09-25",
				"2022-10-02",
				"2022-10-09",
				"2022-10-16",
				"2022-10-23",
				"2022-10-30",
				"2022-11-06",
				"2022-11-13",
				"2022-11-20",
				"2022-11-27",
				"2022-12-04",
				"2022-12-11",
				"2022-12-18",
				"2022-12-25",
				"2023-01-01",
				"2023-01-08",
				"2023-01-15"
			],
			"weeks": [
				"W4",
				"W5",
				"W6",
				"W7",
				"W8",
				"W9",
				"W10",
				"W11",
				"W12",
				"W13",
				"W14",
				"W15",
				"W16",
				"W17",
				"W18",
				"W19",
				"W20",
				"W21",
				"W22",
				"W23",
				"W24",
				"W25",
				"W26",
				"W27",
				"W28",
				"W29",
				"W30",
				"W31",
				"W32",
				"W33",
				"W34",
				"W35",
				"W36",
				"W37",
				"W38",
				"W39",
				"W40",
				"W41",
				"W42",
				"W43",
				"W44",
				"W45",
				"W46",
				"W47",
				"W48",
				"W49",
				"W50",
				"W51",
				"W52",
				"W1",
				"W2",
				"W3",
				"W4"
			],
			"income": [
				15.1,
				34.4,
				27,
				36.8,
				34.8,
				70.4,
				66.8,
				75.5,
				91,
				91.9,
				125.4,
				120.3,
				103.6,
				104.5,
				137.2,
				102.6,
				80.9,
				95.2,
				98.9,
				101.3,
				76.7,
				98.5,
				97.9,
				98.6,
				106.2,
				60.4,
				58.9,
				62.9,
				42,
				45.8,
				38.1,
				39.8,
				33.4,
				26.7,
				35.3,
				39.5,
				35,
				30.8,
				33,
				37.1,
				26,
				23.7,
				18.7,
				29.5,
				28.2,
				18.8,
				17.7,
				25.7,
				20.3,
				22.6,
				13.6,
				18.5,
				16.2
			],
			"expenses": [
				79,
				73,
				91,
				79,
				82,
				91,
				87,
				70,
				81,
				74,
				71,
				99,
				89,
				94,
				96,
				91,
				90,
				81,
				74,
				85,
				84,
				94,
				94,
				100,
				100,
				81,
				98,
				70,
				71,
				77,
				100,
				95,
				92,
				99,
				75,
				91,
				76,
				72,
				76,
				91
			],
			"sales": [
				22,
				6,
				18,
				35,
				37,
				40,
				95,
				161,
				208,
				136,
				292,
				214,
				123,
				310,
				302,
				304,
				196,
				190,
				220,
				163,
				136,
				138,
				129,
				151,
				58,
				53,
				77,
				34,
				36,
				23,
				25,
				17,
				6,
				20,
				11,
				15,
				10,
				12,
				10,
				2,
				5,
				1,
				7,
				7,
				0,
				1,
				1,
				0,
				3,
				1,
				5,
				2,
				4
			],
		};
		console.log(this.chartData.expenses.length);
	}

};
</script>

<style scoped>

</style>
