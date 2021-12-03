import {BaseModel} from "@/js/models/model.js";

const EmployeesBaseRoute = "/user/payroll/employees";

export class Employee extends BaseModel {

	static _collection_path = EmployeesBaseRoute;
	_create_path = Employee._collection_path;
	static _single_path = EmployeesBaseRoute +"/${id}";
	_delete_path = Employee._single_path;
	_update_path = Employee._single_path;

	constructor(response = undefined) {
		super(response);
		if(!response) {
			this.id = 0;
			this.first_name = "";
			this.last_name = "";
			this.personal_id = "";
			this.country = "Georgia";
			this.address = "";
			this.pays_pension = true;
			//Array of agreements for the employee, is fetched. not used in request
			this.agreements = [];
		}
	}

	create(){
		return this.Create();
	}

	save() {
		return this.Save();
	}

	get(id){
		return Employee.Get(id);
	}

	getCollections(query) {
		return Employee.GetCollection(query, true);
	}
}
