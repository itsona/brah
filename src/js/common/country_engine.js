import {GetCountry} from "../services/geolocation.service";
import defaultConfig from "../../country_configs/default.json";
class CountryEngine {
	constructor(store) {
		this.store = store;
		// this.loadCountryConfig();
		this.pages = {};
	}

	getCountryConfig(country = null) {
		if (this.countryConfig && !country) {
			return new Promise((resolve) => resolve({...defaultConfig, ...this.countryConfig}));
		}
		return this.loadCountryConfig(country);
	}

	getSections(name) {
		if(name === this.currentPage) return this.pages[name].sections;
		this.currentPage = name;
		if(!this.pages[name]){
			const defaultSections = defaultConfig.pages[name].sections;
			const sections = {...defaultSections, ...(this.countryConfig.pages[name] || {}).sections};
			this.pages[name] = {defaultSections, sections};
		}
		return this.pages[name].sections;
	}

	getFields(section) {
		if(!(this.pages[this.currentPage] || {}).sections) return {};
		return {
			...this.pages[this.currentPage].defaultSections[section].fields,
			...(this.pages[this.currentPage].sections[section] || {}).fields};
	}

	async loadCountryConfig(country = null) {
		if(country) {
			return this.importCountryConfig(country).then((config) => {
			    this.currentPage= "";
			    this.pages = [];
				this.countryConfig = config;
				return {...defaultConfig,  config};
			});
		}
		if(this.store.getters["auth/isAuthenticated"] && !this.store.getters["user/company/current"]){
			await this.store.dispatch("user/company/fetchCompany");
		}
		if(this.country) {
			return this.importCountryConfig(this.country).then((config) => {
				this.countryConfig = config;
				return {...defaultConfig, ...config};
			});
		}
		return GetCountry(this.store).then(r => {
			if(!this.country) this.country = r;

			if(this.country === "საქართველო") this.country = "Georgia";
			return this.importCountryConfig(this.country).then((config) => {
				this.countryConfig = config;
				return {...defaultConfig,  ...config};
			});
		});
	}

	async importCountryConfig(country) {
		switch (country) {
		case "Philippines":
			return import("../../country_configs/philippines.json");
		case "Georgia":
			return import("../../country_configs/georgia.json");
		case "Pakistan":
			return import("../../country_configs/pakistan.json");
		case "India":
			return import("../../country_configs/india.json");
		default:
			return  {pages: {}};
		}
	}

	// getRules(validations) {
	//     return validations.join('|');
	// }
	//
	getRules(sectionName,fieldName) {
		return this.getFields(sectionName)[fieldName].validations.join("|");
	}
}

export default CountryEngine;


