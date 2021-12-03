import Axios from "axios";
import {getAccessToken} from "@js/services/jwt.service";
import {API_URL} from "@js/common/config";
import store from "@/store";
import i18n from "@js/locale";


class HttpService {
	/**
   * Given base Url new http service instance
   * This class is wrapper of Axios
   * @ApiUrl base url of api
   */
	constructor(ApiUrl) {
		this._axios = Axios.create({
			baseURL: ApiUrl,
			headers: {
				Accept: "application/json",
			},
			// proxy: {
			//     host: 'localhost',
			//     port: 8080,
			//     // auth: {
			//     //   username: '',
			//     //   password: ''
			//     // }
			// }
		});
		this._axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
		this._axios.defaults.headers.common["accept"] = "application/json";
		this.setExistingJwtHeader();
	}

	/**
   * Given a token, sets it in Axios default headers
   * as a Bearer authorization token
   *
   * @param token jwt access token
   */
	setJwtHeader(token) {
		this._axios.defaults.headers.common["Authorization"] = "Bearer " + token;
	}

	/**
   * Sets already existed token in local storage as Bearer access token
   */
	setExistingJwtHeader() {
		let token = getAccessToken();
		this._axios.defaults.headers.common["Authorization"] = "Bearer " + token;
	}

	/**
   * Removes Bearer jwt token from Axios headers
   * Replaces it with a junk
   */
	removeJwtHeader() {
		this._axios.defaults.headers.common["Authorization"] = "Bearer Dummy";
	}

	/**
   * Wrapper for Axios GET request
   * @uri relative path to api route
   * @urlParams Parameters that should be passed with get request
   *
   * @return Promise with either data or error
   */
	async GET(uri, urlParams = null, headers = {}) {
		const c = {params: urlParams, headers: headers};
		try {
			return await this._axios.get(uri, c);
		} catch (reason) {
			if (reason.response && reason.response.status === 402) {
				await store.dispatch("setSnack", i18n.t("warnings.insufficient_permissions"));
				throw reason;
			}
			if (reason.response && reason.response.status !== 401) {
				throw reason;
			}
			//Try again and if it fails it will just throw by itself
			return await this._axios.get(uri, c);
		}
	}

	/**
   * Wrapper for Axios POST request
   * @uri relative path to api route
   * @baggage Data that should be sent with this request
   *
   * @return Promise with either data or error
   */
	async POST(uri, baggage = null, headers = null) {
		const c = { headers: headers };
		try {
			return await (headers == null
				? this._axios.post(uri, baggage)
				: this._axios.post(uri, baggage, c));
		} catch (reason) {
			if (reason.response && reason.response.status === 402) {
				await store.dispatch("setSnack", i18n.t("warnings.insufficient_permissions"));
				throw reason;
			}
			if (reason.response && reason.response.status !== 401) {
				throw reason;
			}
			return await (headers == null
				? this._axios.post(uri, baggage)
				: this._axios.post(uri, baggage, c));
		}
	}

	/**
   * Wrapper for Axios, DELETE request
   * @uri relative path to api route
   * @baggage Data that should be sent with this request
   * packs _method : delete as a hidden input to let some apis know our intent
   *
   * @return Promise with either data or error
   */
	async DELETE(uri, baggage = null) {
		if (baggage) baggage["_method"] = "DELETE";
		else baggage = { _method: "DELETE" };
		try {
			return await this._axios.delete(uri, baggage);
		}catch (reason) {
			if (reason.response && reason.response.status === 402) {
				await store.dispatch("setSnack", i18n.t("warnings.insufficient_permissions"));
				throw reason;
			}
			if (reason.response && reason.response.status !== 401) {
				throw reason;
			}
			return await this._axios.delete(uri, baggage);
		}
	}

	/**
   * Wrapper for Axios, PUT request
   * @uri relative path to api route
   * @baggage Data that should be sent with this request
   * packs _method : put as a hidden input to let some apis know our intent
   *
   * @return Promise with either data or error
   */
	async PUT(uri, baggage) {
		// if (baggage) baggage["_method"] = "PUT";
		// else baggage = { _method: "PUT" };
		try {
			return await this._axios.put(uri, baggage);
		} catch (reason) {
			if (reason.response && reason.response.status === 402) {
				await store.dispatch("setSnack", i18n.t("warnings.insufficient_permissions"));
				throw reason;
			}
			if (reason.response && reason.response.status !== 401) {
				throw reason;
			}
			return await this._axios.put(uri, baggage);
		}
	}

	/**
   * Wrapper for Axios, PATCH request
   * @uri relative path to api route
   * @baggage Data that should be sent with this request
   * packs _method : put as a hidden input to let some apis know our intent
   *
   * @return Promise with either data or error
   */
	async PATCH(uri, baggage) {
		if (baggage) baggage["_method"] = "PATCH";
		else baggage = { _method: "PATCH" };
		try {
			return await this._axios.patch(uri, baggage);
		} catch (reason) {
			if (reason.response && reason.response.status === 402) {
				await store.dispatch("setSnack", i18n.t("warnings.insufficient_permissions"));
				throw reason;
			}
			if (reason.response && reason.response.status !== 401) {
				throw reason;
			}
			return await this._axios.patch(uri, baggage);
		}
	}

	getHeaders() {
		return this._axios.defaults.headers.common;
	}

	getBase() {
		return this._axios;
	}

	initializeInterceptors(store, router) {
		/**
     * Is called before every call to api
     * If user doesn't have right to access resource or
     * bearer token has been expired, we log the user out
     */
		let err_handler = async (err) => {
			if (err.response.status === 401) {
				//If frontend states that user is authenticated, indicates that access token might have expired
				let originalRequest = err.config;
				//Also check if we have already retried this request
				if (store.getters["auth/isAuthenticated"] && !originalRequest._rtry) {
					originalRequest._rtry = true; //We will retry here anyway
					//Try to renew tokens
					let tokensRefreshed = await refreshTokens(store);
					if (tokensRefreshed) {
						//Return original request after tokens are refreshed
						//If this fails we will know second try also failed and logout user
						originalRequest.response = undefined;
						originalRequest.headers["Authorization"] =
              "Bearer " + store.getters.accessToken;
						return this._axios.request(originalRequest);
					}
				}
				store.commit("auth/logout");
				if (router.currentRoute.name !== "SignIn")
					router.push({ name: "SignIn" });
			}
			// progressbar.fail();
			return Promise.reject(err);
		};
		//Request intercept for starting progress bar
		this._axios.interceptors.request.use(
			(value) => {
				// progressbar.start();
				return Promise.resolve(value);
			},
			(err) => {
				// progressbar.fail();
				return Promise.reject(err);
			}
		);
		//Response intercept
		this._axios.interceptors.response.use((value) => {
			// progressbar.finish();
			return Promise.resolve(value);
		}, err_handler);
	}
}

//Try to refresh token
async function refreshTokens(store) {
	let success;
	//Making request from default axios, to not to go through same interceptors
	Axios.defaults.headers.common["accept"] = "application/json";
	try {
		let tokens = await Axios.post(API_URL + "/token/refresh", {
			refresh_token: store.getters.refreshToken,
		});
		await store.dispatch("setTokens", tokens.data);
		success = true;
	} catch (ignored) {
		success = false;
	}
	return success;
}

const httpInstance = new HttpService(API_URL);
export default httpInstance;
