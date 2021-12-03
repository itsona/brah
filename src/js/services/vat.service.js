export default function GetVatForCountry(country) {
	switch (country) {
	case "Georgia": return {defaultOn: true, amount:18};
	case "Nigeria": return {defaultOn: true, amount: 7.5};
	case "Pakistan": return {defaultOn: true, amount: 17};
	case "Philippines": return {defaultOn: true, amount: 12};
	}
	return {defaultOn: true, amount: 0};
}
