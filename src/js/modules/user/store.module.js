import company from "@js/modules/user/company.module";
import {User} from "@js/models/user";
import {changeLocale} from "@js/common/persistent_locale";
import analytics from "@js/services/analytics.service";
import store from "@/store";

const modules = {
	company: company
};

const state = {
	user: undefined,
	userFetchPromise: null
};

/**
 * Getters for user module
 */
const getters = {
	current(state) {
		return state.user;
	}
};

/**
 * Mutations for auth module are changing frontend app state
 * Mutations are being "commit"ed
 */
const mutations = {
	changeLocale(state, loc) {
		changeLocale(loc);
		if (state.user) {
			state.user.ChangeLocale(loc).then();
		}
	},
	//Set new set of tokens to the existing user
	setUser(state, user) {
		state.user = user;
	},
};

/**
 * Actions for auth module are external functions
 * Actions are being "dispatch"ed
 */
const actions = {
	async fetchUser({state, dispatch}) {
		if(!state.userFetchPromise) state.userFetchPromise = User.Get();
		const user = await state.userFetchPromise;
		dispatch("setUser", user);
		analytics.IdentifyUser(user.id, {
			id: user.id,
			name: user.first_name + " " + user.last_name,
			lang: user.locale,
			email: user.email,
			email_verified: user.email_verified,
			social_login: user.social_login,
		});
		state.userFetchPromise = null;
		return user;
	},
	async setUser({commit}, user) {
		commit("setUser", user);
	},
	async changeLocale({commit},locale) {
		commit("changeLocale", locale);
	}
};

/**
 * Exporting auth module store
 */
export default {
	namespaced: true,
	modules,
	state,
	getters,
	mutations,
	actions
};
