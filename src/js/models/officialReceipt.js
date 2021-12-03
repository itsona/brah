import {GetCountry} from "@js/services/geolocation.service";
import HTTP from "@js/services/http.service";
import { DownloadFileFromBytes } from "../common/helpers";

const OfficialReceiptStorageName = "OfficialReceiptL";

export class OfficialReceipt {
	constructor() {
		this.template_name = "PlainInvoiceTemplate";
		this.lang = "ka"; //TODO change me when used on PAGE
		GetCountry(undefined).then(r=> this.country = r);
		this.invoice_data = {
			status: "unpaid",
			invoice_number: "",
			invoice_date : new Date().toISOString().substr(0, 10),
			payment_date: new Date().toISOString().substr(0, 10),
			payment_terms: "",

			items: [
				{
					name: "",
					unit: "",
					unit_price: 0.0,
					quantity: 1,
					//Can be different for every item if vat_per_item is enables
					//should default to general invoice vat
					vat_percentage: 0,
				}
			],

			vat_per_item: false,
			//Is gross
			vat_included: false,

			subtotal_amount: 0.0,
			total_amount: 0.0,
			paid_amount: 0.0,
			discount: 0.0,
			discount_percentage: 0.0,
			vat: 0.0,
			vat_percentage: 0.0,
			shipping: 0.0,
			currency: "USD",
			comment: "",
			item_notes: "",
			footer: "",
		};
		this.company = {
			name: "",
			address: "",
			city: "",
			zip: "",
 			country: "",
			company_id: "",
			phone: "",
			email: "",
			logo_path: "",
			bank_account: { //IF not included should become null
				account_number: "",
				account_currency: "",
				bank_name: "",
				bank_code: ""
			}
		};
		this.customer = {
			name: "",
			address: "",
			city: "",
			zip: "",
 			country: "",
			company_id: "",
			phone: "",
			email: "",
		};
	}

	setIfVatPerItem(){
		const items = [...this.invoice_data.items];
		let vat_per_item = false;
		this.invoice_data.vat_per_item = false;
		items.forEach((value, index) => {
			value.quantity = parseFloat(value.quantity);
			value.unit_price = parseFloat(value.unit_price);
			value.item = value.name;
			// value.vat = value.unit_price * value.vat_percentage;
			value.vat_percentage = value.vat;
			// if(value.vat_percentage >0) this.vat_included = true;
			if(!index)  vat_per_item = value.vat_percentage > 0;
			else if((value.vat_percentage > 0) !== vat_per_item) this.invoice_data.vat_per_item = true;
		});
	}

	StoreTemporarily() {
		try {
			let data = JSON.stringify(this);
			window.localStorage.setItem(OfficialReceiptStorageName, data);
		} catch (e) {
			console.error(e);
		}
	}

	async RestoreFromStorage() {
		let tmp = window.localStorage.getItem(OfficialReceiptStorageName);
		if (tmp && tmp !== "undefined" && tmp !== "") {
			return JSON.parse(tmp);
		}
		return null;
	}

	RemoveFromStorage() {
		window.localStorage.removeItem(OfficialReceiptStorageName);
	}

	//Returns content-type: application/pdf
	// content disposition inline;charset=utf8;filename=--.pdf
	//After Getting bytes user should download as pdf
	async GetPDF() {

		this.country = await GetCountry(undefined);
		this.setIfVatPerItem();
		try {
			try {
				let {data} = (await HTTP.getBase().post("/official_receipt/pdf", this,
					{ responseType: "blob", headers: {
						"Content-Type": "application/json",
						"Accept": "application/pdf"}
					}));
				const fileName = this.is_receipt ? "official-receipt.pdf" : "invoice.pdf";
				DownloadFileFromBytes(data, fileName);
			}catch(e) {
				console.error(e);
				throw e;
			}

		}catch(e) {
			console.error(e);
			throw e;
		}
	}

	
	async Save() {
		const data = await this.RestoreFromStorage();
		if(!data) throw "data not restored";
		return await HTTP.POST("/user/official_receipt/import", data);
	}
}
