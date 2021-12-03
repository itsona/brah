import {BaseModel} from "@/js/models/model.js";
import { Employee } from "./employee";

const payrollBaseRoute = "/user/payroll/agreements";

export class Agreement extends BaseModel {

	static _collection_path = payrollBaseRoute;
	_create_path = Agreement._collection_path;
	static _single_path = payrollBaseRoute +"/${id}";
	_delete_path = Agreement._single_path;
	_update_path = Agreement._single_path;

	constructor(response = undefined) {
		super(response);
		if(!response) {
			this.id = 0;
			this.employee_id = 0;
			this.employee = new Employee();

			this.start_date = "";
			this.end_date = "";

			this.net_amount = 0.0;
			this.gross_amount = 0.0;
			this.benefit_deduction_amount = 0;

			this.comment = "";
		}
	}
	getCollections() {
		return Agreement.GetCollection("", true);
	}

	save(){
		return this.Save();
	}
}
