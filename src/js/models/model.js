import http from "@js/services/http.service";

export class BaseModel {
    id = 0;
	created_for_account = 0;

    static _api = http;

    static _collection_path = undefined;
    static _single_path = undefined;
    _create_path = undefined;
    _delete_path = undefined;
    _update_path = undefined;

    constructor(response) {
    	if(response) this.ParseFromResponse(response);
    }

    info() {
    	console.log(this);
    }

    /**Save stores given model into database, if model has id, updates it otherwise creates it*/
    async Save() {
    	try {
    		if(this.id === 0)
    			return await this.Create();
    		else
    			return await this.Update();
    	} catch(e) {
    		console.error(e);
    		throw e;
    	}
    }

    async Create() {
    	if(!this._create_path || typeof this._create_path != "string") {
    	    throw Error("not defined");
    	}
    	const path = this.created_for_account ? `${this._create_path}?account_id=${this.created_for_account}`:this._create_path;
    	const data = (await BaseModel._api.POST(path, this.GetAPIRequestFormat())).data;
    	this.ParseFromResponse(data);
    }

    async Update() {
    	if(!this._update_path || typeof this._update_path != "string") {
    	    throw Error("not defined");
    	}
    	let prepared_path = this._update_path.replace("${id}", this.id);
    	const data = (await BaseModel._api.PUT(prepared_path, this.GetAPIRequestFormat())).data;
    	this.ParseFromResponse(data);
    }

    async Delete() {
    	if(!this._delete_path || typeof this._delete_path != "string") {
    	    throw Error("not defined");
    	}
    	let prepared_path = this._delete_path.replace("${id}", this.id);
    	const data = (await BaseModel._api.DELETE(prepared_path)).data;
    	this.id = 0; //Deleted
    	return data;
    }
    async Refetch() {
    	if(!this._update_path || typeof this._update_path != "string") {
    		throw Error("not defined");
    	}
    	let prepared_path = this._update_path.replace("${id}", this.id);
    	this.ParseFromResponse((await BaseModel._api.GET(prepared_path)).data);
    }

    static async Get(id) {
    	if(!this._single_path || typeof this._single_path != "string") {
    	    throw Error("not defined");
    	}
    	let prepared_path = this._single_path.replace("${id}", id);
    	const data = (await BaseModel._api.GET(prepared_path)).data;
    	return new this.prototype.constructor(data);
    }

    static async GetCollection(search_query="", has_pagination=false) {
    	if(!this._collection_path || typeof this._collection_path != "string") {
    	    throw Error("not defined");
    	}
    	let prepared_path = this._collection_path + search_query;
    	const data = (await BaseModel._api.GET(prepared_path)).data;
    	if(!has_pagination && !Array.isArray(data)) {
    		throw Error("fetched data is not an array");
    	} else if(has_pagination && !(data.hasOwnProperty("records") && Array.isArray(data.records))) {
    		throw Error("fetched data does not contain --records--");
    	}
    	const mapCollection = (r) => {
    		return new this.prototype.constructor(r);
    	};
    	if(has_pagination) {
    		data.records = data.records.map(mapCollection);
    		return data;
    	}
    	return data.map(mapCollection);
    }

    GetAPIRequestFormat() {
    	return this;
    }

    ParseFromResponse(response) {
    	Object.keys(response).forEach(k => {
    		this[k] = response[k];
    	});
    }
}
