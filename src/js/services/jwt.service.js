import { STORAGE_TOKEN_INSTANCE, JWT_TOKEN_TITLE, ACCOUNT_ID_TITLE } from "@js/common/config";

export const setAccountID = async (id) => {
	try {
		window.localStorage.setItem(ACCOUNT_ID_TITLE, id.toString());
	} catch (e) {
		console.error(e);
	}
};

export const getAccountID = () => {
	try {
		const id = window.localStorage.getItem(ACCOUNT_ID_TITLE);
		return id ? id : 0;
	} catch (e) {
		console.error(e);
	}
	return 0;
};

export const getAccessToken = () => {
	let userInstance = null;
	try {
		userInstance = window.localStorage.getItem(STORAGE_TOKEN_INSTANCE);
	} catch (e) {
		console.error(e);
	}
	let token = "";
	if (userInstance !== null) {
		try {
			userInstance = JSON.parse(userInstance);
			token = userInstance[JWT_TOKEN_TITLE];
			token = token ? token : "";
		} catch (e) {
			console.error(e);
		}
	}
	return token;
};

export const getTokens = () => {
	let tokens = undefined;
	try {
		tokens = window.localStorage.getItem(STORAGE_TOKEN_INSTANCE);
	} catch (e) {
		console.error(e);
		return undefined;
	}
	if (!tokens) return undefined;
	try {
		tokens = JSON.parse(tokens);
		return tokens;
	} catch (e) {
		console.error(e);
		return undefined;
	}
};

/*Stores new access and refresh tokens to local storage*/
export const storeTokens = (access, refresh) => {
	let tokensS = null;
	try {
		tokensS = window.localStorage.getItem(STORAGE_TOKEN_INSTANCE);
	} catch (e) {
		console.error(e);
	}
	let tokens = {};
	if (tokensS) {
		try {
			tokens = JSON.parse(tokensS);
		} catch (e) {
			console.error("couldn't parse user as valid object", e);
		}
	}
	//Set new tokens
	tokens.access_token = access;
	tokens.refresh_token = refresh;
	//put it back
	try {
		window.localStorage.setItem(STORAGE_TOKEN_INSTANCE, JSON.stringify(tokens));
	} catch (e) {
		console.error("can't set item to local storage", e);
	}
};

export const destroyTokens = () => {
	try {
		window.localStorage.removeItem(STORAGE_TOKEN_INSTANCE);
	} catch (e) {
		console.error("couldn't delete user from localStorage", e);
	}
};

export default { getAccessToken, getTokens, storeTokens, destroyTokens };
