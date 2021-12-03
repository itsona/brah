import {BaseModel} from "@/js/models/model.js";

const customersBaseRoute = "/user/customers";

export class Customer extends BaseModel {

	static _collection_path = customersBaseRoute;
	_create_path = Customer._collection_path;
	static _single_path = customersBaseRoute +"/${id}";
	_delete_path = Customer._single_path;
	_update_path = Customer._single_path;
	//Fields
	// address = "";
	// all_income = "";
	// city = "";
	// contact_person = "";
	// country = "";
	// email = "";
	// id = "";
	// name = "";
	// notes = "";
	// phone = "";
	// tax_id = "";
	// web_page = "";
	// zip = "";
	//Fields
	constructor(response = undefined) {
		super(response);
		if(!response) {
			this.address = "";
			this.all_income = "";
			this.city = "";
			this.contact_person = "";
			this.country = "";
			this.email = "";
			this.id = "";
			this.name = "";
			this.notes = "";
			this.phone = "";
			this.tax_id = "";
			this.web_page = "";
			this.zip = "";
		}

	}
}
