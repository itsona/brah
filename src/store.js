import AuthModule from "@js/modules/auth/store.module";
import Vue from "vue";
import Vuex from "vuex";
import UserModule from "@js/modules/user/store.module";

Vue.use(Vuex);

// initial state
function initialState() {
	return {
		loader: false,
		snack: "",
		userId: "",
	};
}

const store = new Vuex.Store({
	namespaced: true,
	state: initialState,
	mutations: {
		setLoader(state, newValue) {
			state.loader = newValue;
		},
		setSnack(state, newValue) {
			state.snack = newValue;
		}
	},
	getters: {
		getLoader(state) {
			return state.loader;
		}
	},
	actions: {
		setLoader({ state, commit }, newValue) {
			commit("setLoader", newValue);
			return state.loader;
		},
		setSnack({ state, commit }, newValue) {
			commit("setSnack", newValue);
			return state.snack;
		},
	},
	modules: {
		auth: AuthModule,
		user: UserModule
	}
});

const initialize = async function() {
	try {
		if(store.getters["auth/isAuthenticated"]) {
			store.dispatch("user/fetchUser")
				.then()
				.catch(e => console.error(e));
			store.dispatch("user/company/fetchCompany")
				.then()
				.catch(e => {
					console.error(e);
				});
		}
	} catch (e) {
		console.error(e);
	}
};
initialize().then();

window.store = store;

export default store;
