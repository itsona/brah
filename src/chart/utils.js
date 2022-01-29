const ranges = [
	{ divider: 1e6, suffix: "M" },
	{ divider: 1e3, suffix: "k" }
];

export const formatAxisTicks = function (value) {
	function formatNumber (n) {
		for (var i = 0; i < ranges.length; i++) {
			if (n >= ranges[i].divider) {
				return (n / ranges[i].divider).toString() + ranges[i].suffix;
			}
		}
		return n;
	}

	return formatNumber(value);
};


export const chartColors = ["#007AFF", "#4CAF50", "#FF9800", "#FF9A9A", "#085D70", "#9BE48E", "#4FB4AB", "#F989D0", "#EE3766", "#765397", "#FF675B", "#73A1C7", "#F5907B"];
export const hexToRgbA = function (hex, opacity) {
	let c;
	if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
		c = hex.substring(1).split("");
		if (c.length === 3) {
			c = [c[0], c[0], c[1], c[1], c[2], c[2]];
		}
		c = "0x" + c.join("");
		return "rgba(" + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") + "," + opacity + ")";
	} else {
		return hex;
	}
};
