import {BaseModel} from "@/js/models/model.js";
import {GetCity, GetCountry, GetCurrency} from "@js/services/geolocation.service";
import GetVatForCountry from "@js/services/vat.service";

const accountsBaseRoute = "/user/accounts";

export class Company extends BaseModel {
	static _collection_path = accountsBaseRoute;
	_create_path = Company._collection_path;
	static _single_path = accountsBaseRoute +"/${id}";
	_delete_path = Company._single_path;
	_update_path = Company._single_path;
	//Fields
	// name;
	// tax_id;
	// vat_payer;
	// vat_percentage;
	// default_currency;
	// logo;
	// address;
	// phone;
	// email;
	// city;
	// country;
	// zip;
	// employee_count;
	// industry;
	// pdf_template;
	// is_owner;
	//Fields
	constructor(response = undefined) {
		super(response);
		if(!response) {
			this.name = "";
			this.tax_id = "";
			this.vat_payer = true;
			this.vat_percentage = 0;
			this.default_currency = "";
			this.vat_included = true;
			this.logo = "";
			this.address = "";
			this.phone = "";
			this.email = "";
			this.city = "";
			this.country = "";
			this.zip = "";
			this.employee_count = 0;
			this.industry = "";
			this.pdf_template = "PlainInvoiceTemplate";
			this.is_owner = false;
			this.all_count = 0;
			this.subscription_features = {}; //Describes features for this account

			this.options = {
				pagination_per_page: 10,
				mailing: "kernel"
			};
		}

	}

	static async Create() {
		const res = (await BaseModel._api.POST("/user/accounts")).data;
		return new Company(res);
	}

	async Delete() {
		throw Error("this action isn't supported");
	}

	async Save() {
		this.name = this.name.trim();
		this.employee_count = parseInt(this.employee_count);
		return this.id === 0 ? await this.Create() : await this.Update();
	}

	async GetItemUnits(locale, getDefault) {
		let units = [];
		if(!getDefault) {
			try {
				units = (await BaseModel._api.GET(`/user/accounts/${this.id}/item-units`)).data;
			}catch (e) {
				console.error(e);
			}
		}
		let defaults = [];

		if (locale === "ka")
			defaults = ["ცალი", "კგ", "ლიტრი", "მეტრი", "საათი"];
		else
			defaults = ["pcs", "kg", "litre", "meter", "hour"];

		units = units.map(v => {
			defaults = defaults.filter(d => d !== v.unit.toLowerCase());
			return v.unit;
		});

		units = units.concat(defaults);
		return units;
	}

	async SetGeolocationSettings(store = undefined) {
		//Get and set country/city info to account data
		const vat = GetVatForCountry(this.country);
		try {
			if (this.country === "") this.country = await GetCountry(store);
			if (this.city === "") this.city = await GetCity(store);
			if (this.default_currency === "") this.default_currency = await GetCurrency(store);
			if(this.name.trim() === "") {
				this.vat_payer = vat.defaultOn;
				this.vat_percentage = vat.amount/100;
			}

		}catch (e) {
			console.error(e);
		}
	}

	async UpdatePDFTemplate(template) {
		let company = (await BaseModel._api.POST(`/user/accounts/${this.id}/pdf-template?template_name=${template}`)).data;
		// this.ParseFromResponse(company);
		return company;
	}

	async GetSMTPSettings() {
		return (await BaseModel._api.GET(`/user/accounts/${this.id}/smtp-config`)).data;
	}

	async GetPaymentTermsList() {
		let paymentTerms = [];
		try {
			let resp = (await BaseModel._api.GET(`/user/accounts/${this.id}/payment-terms`)).data;
			paymentTerms = resp.map(v => v.payment_term);
		} catch (e) {
			console.error(e);
		}
		return paymentTerms;
	}

	async SetSMTPSettings(settings) {
		settings.port = settings.port.toString();
		return (await BaseModel._api.POST(`/user/accounts/${this.id}/smtp-config`, settings)).data;
	}
	async ActivateTrial() {
		let company = (await BaseModel._api.POST(`/payments/subscriptions/${this.id}/trial`)).data;
		this.ParseFromResponse(company);
		return company;
	}
	async SetCompanyOptions(options) {
		this.options = (await BaseModel._api.POST(`/user/accounts/${this.id}/options`, options)).data;
	}

	//kernel, smtp, manual
	async SetMailingOption(option) {
		const no = {...this.options};
		no.mailing = option;
		await this.SetCompanyOptions(no);
	}

	async SetPaginationPerPage(pages) {
		const no = {...this.options};
		no.pagination_per_page = pages;
		await this.SetCompanyOptions(no);
	}

	//RS
	async GetRsCredentials() {
		return (await BaseModel._api.GET(`/user/accounts/rs/credentials?account_id=${this.id}`)).data;
	}

	async SetRSCredentials(username, password, tax_id) {
		return (await BaseModel._api.PUT(`/user/accounts/rs/credentials?account_id=${this.id}`, {username, password,tax_id})).data;
	}

	async ImportProductsFromRS() {
		return (await BaseModel._api.POST(`/user/accounts/rs/import-products?account_id=${this.id}`)).data;
	}

	async ImportCustomersFromRS() {
		return (await BaseModel._api.POST(`/user/accounts/rs/import-customers?account_id=${this.id}`)).data;
	}

	async ImportInvoicesFromRS() {
		return (await BaseModel._api.POST(`/user/accounts/rs/import-invoices?account_id=${this.id}`)).data;
	}
}
