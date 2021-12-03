import {BaseModel} from "@/js/models/model.js";
import {API_URL} from "@js/common/config";
import i18n from "@js/locale";

const invoicesBaseRoute = "/user/invoices";

export class Invoice extends BaseModel {
	static _collection_path = invoicesBaseRoute;
	_create_path = Invoice._collection_path;
	static _single_path = invoicesBaseRoute +"/${id}";
	_delete_path = Invoice._single_path;
	_update_path = Invoice._single_path;
	//Fields
	// invoice_no = "000000000";
	// issue_date = "";
	// payment_term = "";
	// payment_date = "";
	// //TODO replace with invoice item class
	// items = [
	// 	{
	// 		id: 0,
	// 		product_id: 0,
	// 		quantity: 1,
	// 		name: "",
	// 		unit: "",
	// 		unit_price: undefined,
	// 		vat: 0
	// 	}
	// ];
	// footer = "";
	// customer_id = 0;
	// item_comment = "";
	// status = "unpaid";
	// total_amount = 0;
	// paid_amount = 0;
	// vat_percentage = 0;
	// discount_percentage = 0;
	// currency = "";
	// //TODO replace with bank account class
	// bank_name = "";
	// bank_code = "";
	// bank_account_number = "";
	// bank_account_id = 0;
	// customer = null;
	// shipping = undefined;

	constructor(response = undefined) {
		super(response);
		if(!response) {
			this.is_receipt = false;
			this.invoice_no = "000000000";
			this.issue_date = "";
			this.payment_term = "";
			this.payment_date = "";
			//TODO replace with invoice item class
			this.items = [
				{
					id: 0,
					product_id: 0,
					quantity: 1,
					name: "",
					unit: "",
					type: "Goods",
					unit_price: 0,
					vat_percentage: 0,
					vat: 0
				}
			];
			this.footer = "";
			this.customer_id = 0;
			this.item_comment = "";
			this.status = "unpaid";
			this.total_amount = 0;
			this.paid_amount = 0;
			this.vat_percentage = 0;
			this.discount_percentage = 0;
			this.currency = "";
			//TODO replace with bank account class
			this.bank_name = "";
			this.bank_code = "";
			this.bank_account_number = "";
			this.bank_account_id = 0;
			this.customer = null;
			this.shipping = undefined;
			this.customer = undefined;
			this.options = {
				payment_interval: 0,
			};
		}
	}

	async Save() {
		if (typeof this.shipping !== "number") this.shipping = parseFloat(this.shipping);
		//Flatten
		this.customer_id = (this.customer || {}).id || 0;
		const items = [...this.items];
		let vat_per_item = false;
		this.vat_per_item = false;
		let vat_included = false;
		items.forEach((value, index) => {
			value.quantity = parseFloat(value.quantity);
			value.unit_price = parseFloat(value.unit_price);
			value.item = value.name;
			// value.vat = value.unit_price * value.vat_percentage;
			value.vat_percentage = value.vat;
			if(value.vat_percentage >0) vat_included = true;
			if(!index)  vat_per_item = value.vat_percentage > 0;
			else if((value.vat_percentage > 0) !== vat_per_item) this.vat_per_item = true;
		});
		if(this.vat_included) this.vat_included = vat_included;
		if (!this.isBankTransfer) {
			this.bank_name = "";
			this.bank_code = "";
			this.bank_account_id = 0;
			this.bank_account_number = "";
		}
		if(this.id) return await this.Update();
		return await this.Create();
	}

	async SendToClient() {

	}

	async MakeRecurring() {
		const path = Invoice._single_path.replace("${id}", this.id);
		return new Invoice((await BaseModel._api.POST(`${path}/make-recurring`)).data);
	}

	async RegisterPayment(payment_amount = 0, needParse = true) {
		let paid_amount = this.paid_amount;
		if (payment_amount < 0) {
			paid_amount = this.total_amount;
		} else {
			paid_amount += payment_amount;
			if (paid_amount > this.total_amount) {
				paid_amount = this.total_amount;
			}
		}
		const path = Invoice._single_path.replace("${id}", this.id);
		const data = (await BaseModel._api.POST(`${path}/register-payment`, {
			paid_amount: paid_amount,
			full_payment: paid_amount === this.total_amount})).data;
		if(needParse) this.ParseFromResponse(data);
	}

	async ViewPDF(locale, single_path = Invoice._single_path) {
		const path = single_path.replace("${id}", this.id);
		const response = await BaseModel._api.GET(`${path}/pdf?lang=${locale}`);
		window.open(`${API_URL}/invoices/${response.data.uuid}?lang=${locale}&tab=t`);
	}

	async ChangeStatus(new_status, single_path = Invoice._single_path) {
		if (this.customer_id === 0 || new_status === this.status) return;
		const path = single_path.replace("${id}", this.id);
		this.ParseFromResponse((await BaseModel._api.POST(`${path}/change-status`,{status: new_status})).data);
	}

	async Duplicate(single_path = Invoice._single_path) {
		const path = single_path.replace("${id}", this.id);
		const data = (await BaseModel._api.POST(`${path}/duplicate`)).data;
		return new Invoice(data);
	}

	async ExportToRS() {
		let messageToReturn = "";
		const path = Invoice._single_path.replace("${id}", this.id);
		try {
			const data = (await BaseModel._api.POST(`${path}/export-to-rs`)).data;
			messageToReturn = i18n.t("pages.rs_invoice_export.success", {id:data.rs_invoice_id});
		} catch (e) {
			if(e.response) console.error(e.response);
			messageToReturn = getRSExportErrorMessage(e.response.data);

			throw (messageToReturn);
		}
		return messageToReturn;
	}
}

function getRSExportErrorMessage(error_data) {
	let params = {};
	switch (error_data.error_type) {
	case "rs_invoice_already_exists":
		params = {invoice_id: error_data.rs_invoice_id};
		break;
	case "rs_cant_delete_invoice":
		params = {invoice_id: error_data.rs_invoice_id};
		break;
	case "company_name_or_tin_dont_match":
		params = {
			our_name: error_data.our_name,
			rs_name: error_data.rs_name,
			our_tin: error_data.our_tin,
			rs_tin: error_data.rs_tin
		};
		break;
	case "invalid_customer_tin_format":
		params = {
			tin: error_data.tin
		};
		break;
	case "rs_entity_with_tin_not_found":
		params = {
			tin: error_data.tin
		};
		break;
	case "customer_name_doesnt_match":
		params = {
			our_name: error_data.our_name,
			rs_name: error_data.rs_name,
		};
		break;
	}

	return i18n.t("pages.rs_invoice_export.errors." + error_data.error_type, params);

}
