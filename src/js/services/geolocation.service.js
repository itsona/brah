import HTTP from "@js/services/http.service";
import Axios from "axios";

import Countries from "@js/services/countries.json";
let ip_info = null;
let ip = "";

const getIP = async () => {
	try {
		if (ip === "") {
			ip = await Axios.get("https://api.ipify.org");
			ip = ip.data;
		}
		if (ip !== "") return ip;
		return "";
	} catch (e) {
		console.error("IP detection error: ", e);
		return "";
	}
};

const getIPInfo = async (ip) => {
	try {
		if (ip_info === null) {
			ip_info = await HTTP.GET("/ip-info/" + ip);
			ip_info = ip_info.data;
		}
		if (ip_info) return ip_info;
		return { country: "International", currency: "USD", city: "" };
	} catch (e) {
		console.error("Country detection error: ", e);
		return { country: "International", currency: "USD", city: "" };
	}
};
const hasAccount = (store) =>
	store && store.getters["auth/isAuthenticated"] && store.getters["user/company/current"];

export async function GetCountry(store) {
	let country;
	//General store case
	if (store && store.company && store.company.country && typeof store.company.country === "string") country = store.company.country; //Store state case
	else if (store && hasAccount(store) && store.getters["user/company/current"].country !== "" && store.getters["user/company/current"].country !== "International")
		country = store.getters["user/company/current"].country;
	else country = (await getIPInfo(await getIP())).country; //Fallback to default detection
	country = country === "საქართველო" ? "Georgia" : country;
	return country;
}
export async function GetCountryCode(store) {
	//TODO review country codes
	let country = await GetCountry(store);
	switch (country) {
	case "Georgia":
		return "GE";
	case "Nigeria":
		return "NG";
	case "Philippines":
		return "PH";
	}
	return "US";
}

export async function GetPixelCode(store) {
	if(store && !store.getters["user/company/current"]){
		await store.dispatch("user/company/fetchCompany");
	}
	let country = await GetCountry(store);
	switch (country) {
	case "Georgia":
		return "1024645551265473";
	case "Philippines":
		return "141689827716625";
	case "Pakistan":
		return "210317173953235";
	case "Nigeria":
		return "681807555814524";
	case "India":
		return "316688003076736";
	}
	return "470189021027194";
}

export async function GetCurrency(store) {
	if (hasAccount(store) && store.getters["user/company/current"].default_currency !== "")
		return store.getters["user/company/current"].default_currency;
	else return (await getIPInfo(await getIP())).currency;
}

export async function GetCity(store) {
	if (hasAccount(store) && store.getters["user/company/current"].city !== "")
		return store.getters["user/company/current"].city;
	else return (await getIPInfo(await getIP())).city;
}

export function GetCountries(locale="en") {
	let countries = Countries.countries.map((x) => {
		if(locale === "ka") return {text: x.countryNameKA, value: x.countryName};
		return {text: x.countryName, value: x.countryName};
	});
	return countries;
}
