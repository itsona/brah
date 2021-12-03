/**
 * Global storage service is a key value pair class, which is just a object and is stored and revived using localstorage
 * */
class GlobalStorageService {
  static StorageEntryName = "kernel_storage";

  /*Creates new storage map and puts initialized key to true*/
  constructor() {
  	this._map_storage = {
  		initialized: true
  	};
  	this._revive();
  	window.onbeforeunload = this._bury;
  }

  /*Revives from local storage, at least tries to...*/
  _revive() {
  	try {
  		let tmp = window.localStorage.getItem(
  			GlobalStorageService.StorageEntryName
  		);
  		if (tmp && tmp !== "undefined" && tmp !== "") {
  			this._map_storage = JSON.parse(tmp);
  		}
  	} catch (e) {
  		console.error(e);
  	}
  }

  /*Buries/Stores map into localStorage and makes it ready to be retrieved later*/
  _bury = () => {
  	this.StoreString("Buried", true);
  	try {
  		let data = JSON.stringify(this._map_storage);
  		window.localStorage.setItem(GlobalStorageService.StorageEntryName, data);
  	} catch (e) {
  		console.error(e);
  	}
  };

  StoreString(key, str) {
  	this.Set(key, str, false);
  }

  GetString(key) {
  	return this.Get(key, false);
  }

  RemoveItem(key) {
  	// this._map_storage.delete(key);
  	this._map_storage[key] = undefined;
  }

  StoreObject(key, data) {
  	this.Set(key, data, true);
  }

  GetObject(key) {
  	return this.Get(key, true);
  }

  Set(key, data, isObject = false, localStorage = false) {
  	try {
  		if (isObject) data = JSON.stringify(data);
  		this._map_storage[key] = data;
  		if (localStorage) window.localStorage.setItem(key, JSON.stringify(data));
  	} catch (e) {
  		console.error(e);
  		console.error("Couldn't set item: ", key);
  	}
  }

  Get(key, isObject = false, localStorage = false) {
  	let retrieved;
  	try {
  		if (localStorage) retrieved = window.localStorage.getItem(key);
  		else retrieved = this._map_storage[key];
  	} catch (e) {
  		console.error("Getting item(" + key + ") from local storage failed", e);
  		retrieved = null;
  	}
  	if (!retrieved) {
  		return null;
  	}
  	if (!isObject) {
  		return retrieved;
  	}
  	try {
  		if (retrieved !== "") retrieved = JSON.parse(retrieved);
  		else retrieved = {};
  		if (retrieved) return retrieved;
  	} catch (e) {
  		console.error(e);
  	}
  	return null;
  }
}

const storage = new GlobalStorageService();
export default storage;
