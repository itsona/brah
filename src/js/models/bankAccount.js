import {BaseModel} from "@/js/models/model.js";

const bankAccountBaseRoute = "/user/bank-accounts";

export class BankAccount extends BaseModel {

	static _collection_path = bankAccountBaseRoute;
	static _create_path = this._collection_path;
	static _single_path = bankAccountBaseRoute +"/${id}";
	static _delete_path = this._single_path;
	static _update_path = this._single_path;
	//Fields
	// currency = "";
	// bank_name = "";
	// bank_code = "";
	// account_number = "";
	// currency_symbol = "";
	// created_for_account = 0;
	//Fields
	constructor(response = undefined) {
		super(response);
		if (!response) {
			this.currency = "";
			this.bank_name = "";
			this.bank_code = "";
			this.account_number = "";
			this.currency_symbol = "";
			this.created_for_account = 0;
		}
	}

	static async GetCollection(account_id = 0) {
		return super.GetCollection(`?account_id=${account_id}`);
	}
}
