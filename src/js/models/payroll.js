import {BaseModel} from "@/js/models/model.js";
import { DownloadFileFromBytes } from "../common/helpers";

const payrollBaseRoute = "/user/payrolls";

export class Payroll extends BaseModel {

	static _collection_path = payrollBaseRoute;
	_create_path = Payroll._collection_path;
	static _single_path = payrollBaseRoute +"/${id}";
	_delete_path = Payroll._single_path;
	_update_path = Payroll._single_path;

	constructor(response = undefined) {
		super(response);
		if(!response) {
			this.id = 0;
			this.employee_name = "";
			this.employee_id = 0;
			this.agreement_id = 0;
			this.payment_date = new Date().toISOString().substr(0,10);

			this.fixed_net_amount = 0;
			this.variable_net_amount = 0;
			this.benefit_deduction_amount = 0;
			this.fixed_tax = 0;
			this.benefit_deduction_tax = 0;
			this.variable_tax = 0;
			this.fixed_gross_amount = 0;
			this.variable_gross_amount = 0;
			this.social_employee_amount = 0;
			this.total_gross = 0;
			this.total_net = 0;
			this.social_employer_amount = 0;
			this.total_cost = 0;
			this.paid_amount = 0;

			this.status = "";
			this.paid = false;
		}
	}

	save(){
		return this.Save();
	}

	get(id){
		return Payroll.Get(id);
	}

	getCollections(query) {
		return Payroll.GetCollection(query, true);
	}

	// total_cost
	// total_tax
	// total_social
	// outstanding
	static async GetStats(account_id = 0) {
		return (await BaseModel._api.GET(`/user/payroll/stats?account_id=${account_id}`)).data;
	}

	static async GetXML(account_id, startDate="", endDate="") {
		try {
			let {data} = (await BaseModel._api.GET(`/user/payroll/export-xml?account_id=${account_id}&start_date=${startDate}&end_date=${endDate}`, null,
				{ responseType: "blob", headers: {
					"Content-Type": "application/json",
					"Accept": "text/xml"}
				}));
			const fileName = "payrolls.xml";
			DownloadFileFromBytes(data, fileName);
		}catch(e) {
			console.error(e);
			throw e;
		}
	}
}
