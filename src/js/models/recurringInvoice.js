import {Invoice} from "@js/models/invoice";

const recurringInvoicesBaseRoute = "/user/recurring-invoices";

export class RecurringInvoice extends Invoice {

	static _collection_path = recurringInvoicesBaseRoute;
	_create_path = RecurringInvoice._collection_path;
	static _single_path = recurringInvoicesBaseRoute +"/${id}";
	_delete_path = RecurringInvoice._single_path;
	_update_path = RecurringInvoice._single_path;
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
	// //Perhaps separate class for invoice options
	// options: {
	// 	payment_interval: 0,
	// }

	constructor(response = undefined) {
		super(response);
		if(!response) {
			//Perhaps separate class for invoice options
			this.options = {
				payment_interval: 0,
			};
		}
	}

	async RegisterPayment() {
		throw Error("undefined");
	}

	async ViewPDF() {
		throw Error("undefined");
	}

	async ChangeStatus() {
		throw Error("undefined");
	}

	async Duplicate() {
		throw Error("undefined");
	}
}
