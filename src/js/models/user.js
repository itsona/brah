import {BaseModel} from "@/js/models/model.js";

export class User extends BaseModel {

	static _single_path = "/user/details";
	_update_path = "/user";
	//Fields
	// first_name = "";
	// last_name = "";
	// personal_id = "";
	// email = "";
	// email_verified = true;
	// phone = "";
	// locale = "";
	// country = "";
	// city = "";
	// zip = "";
	// address = "";
	// social_login = false;
	//Fields
	constructor(response = undefined) {
		super(response);
		if(!response) {
			this.first_name = "";
			this.last_name = "";
			this.personal_id = "";
			this.email = "";
			this.email_verified = true;
			this.phone = "";
			this.locale = "";
			this.country = "";
			this.city = "";
			this.zip = "";
			this.address = "";
			this.social_login = false;
		}
	}
	async Delete() {
		throw Error("this action isn't supported");
	}
	async Create() {
		throw Error("this action isn't supported");
	}
	static async GetCollection() {
		throw Error("this action isn't supported");
	}
	static async Get(account_id=0) {
		if(!this._single_path || typeof this._single_path != "string") {
			throw Error("not defined");
		}
		const data = (await BaseModel._api.GET(`${this._single_path}?account_id=${account_id}`)).data;
		return new this.prototype.constructor(data);
	}
	async ChangeLocale(locale) {
		await BaseModel._api.POST("/user/change-locale/" + locale);
		this.locale = locale;
	}
	async Save() {
		this.first_name = this.first_name.trim();
		this.last_name = this.last_name.trim();
		return this.Update();
	}
}
