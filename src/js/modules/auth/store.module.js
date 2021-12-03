/**
 * This is a Vuex store module for auth
 * Managing registration and login currently
 */

import {
	destroyTokens,
	storeTokens,
	getTokens
} from "@js/services/jwt.service";
import Http from "@js/services/http.service";
import analytics from "@js/services/analytics.service";
import {User} from "@js/models/user";

/**
 * State for auth module
 */
const tokens = getTokens();

const state = {
	tokens: tokens,
	isAuthenticated: !!tokens
};

/**
 * Getters for auth module
 */
const getters = {
	isAuthenticated(state) {
		return state.isAuthenticated;
	},

	refreshToken(state) {
		if (!state.tokens) {
			return "Dummy";
		}
		return state.tokens.refresh_token ? state.tokens.refresh_token: "Dummy";
	},

	accessToken(state) {
		if (!state.tokens) {
			return "Dummy";
		}
		return state.tokens.access_token ? state.tokens.access_token : "Dummy";
	}
};

/**
 * Mutations for auth module are changing frontend app state
 * Mutations are being "commit"ed
 */
const mutations = {
	login(state, user, errors) {
		if (errors) {
			state.tokens = undefined;
			state.isAuthenticated = false;
		} else if (user) {
			state.isAuthenticated = true;
			state.tokens = {
				access_token: user.access_token,
				refresh_token: user.refresh_token,
			};
			Http.setJwtHeader(user.access_token);
			storeTokens(user.access_token, user.refresh_token);
		} else {
			console.error("something went Wrong during authentication");
		}
	},
	//Set new set of tokens to the existing user
	setTokens(state, tokens) {
		if(!tokens) {
			state.isAuthenticated = false;
			return;
		}
		state.isAuthenticated = true;
		state.tokens = tokens;
		Http.setJwtHeader(tokens.access_token);
		storeTokens(tokens.access_token, tokens.refresh_token);
	},

	logout(state) {
		Http.removeJwtHeader();
		state.isAuthenticated = false;
		state.tokens = undefined;
		destroyTokens();
	}
};

/**
 * Actions for auth module are external functions
 * Actions are being "dispatch"ed
 */
const actions = {
	async setTokens(context, tokens) {
		context.commit("setTokens", tokens);
	},
	async signIn(context, credentials) {
		try {
			const response = await Http.POST("/sign-in", credentials);
			await performLogin(context, response);
			analytics.Track("sign_in");
			return response;
		} catch(e) {
			context.commit("login", null, e);
			throw e;
		}
	},

	async logout(context) {
		try {
			await Http.POST("/user/logout");
			context.commit("logout");
			return "Logged out!";
		}catch (e) {
			context.commit("logout");
			throw e;
		}
	},
	/**
   *
   * @param context
   * @param data object {email, first_name, last_name, password}
   */
	async signUp(context, data) {
		const response = await Http.POST("/sign-up", data);
		const user = response.data.user;
		analytics.IdentifyUser(user.id, {
			id: user.id,
			lang: user.locale,
			name: user.first_name + " " + user.last_name,
			email: user.email,
			email_verified: false,
			social_login: false
		});
		analytics.Track("sign_up", {
			id: user.id,
			lang: user.locale,
			email: user.email,
			name: user.first_name + " " + user.last_name
		});
		await performLogin(context, response);
	}
};

/*Logs user into state and send identify to statistics*/
async function performLogin(context, response) {
	let userData = response.data;
	let user = new User(userData.user);
	analytics.IdentifyUser(user.id, {
		id: user.id,
		lang: user.locale,
		name: user.first_name + " " + user.last_name,
		email: user.email,
		email_verified: user.email_verified,
		social_login: user.social_login
	});
	context.commit("login", userData, null);
	await context.dispatch("user/setUser", user, {root: true});
}

/**
 * Exporting auth module store
 */
export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
};
