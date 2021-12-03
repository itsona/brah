import {Company} from "@js/models/company";
import {getAccountID, setAccountID} from "@js/services/jwt.service";
import {GetCountryCode} from "@js/services/geolocation.service";
import httpInstance from "@js/services/http.service";
import analytics from "@js/services/analytics.service";


const state = {
	company: new Company(),
	canRetryToSub: true,
	fetchAccountPromise: null,
};

const getters = {
	current(state) {
		return state.company;
	}
};

const mutations = {
	setCompany(state, company) {
		state.company = company;
		setAccountID(company.id);
	}
};

const actions = {
	async setCompany({commit}, company) {
		commit("setCompany", company);
	},
	async fetchCompany({state, commit}, id=undefined) {
		let accID = state.company ? state.company.id : 0;

		if(id !== undefined) accID = id;
		else if(!accID) accID = getAccountID();

		if(!state.fetchAccountPromise) state.fetchAccountPromise = Company.Get(accID);
		try {
			const company = await state.fetchAccountPromise;
			commit("setCompany", company);
			state.fetchAccountPromise = null;
			return company;
		} catch(e) {
			try {
				//If inital fetching failed, failed company with 0 id
				setAccountID(0);
				state.fetchAccountPromise = Company.Get(0);
				const company = await state.fetchAccountPromise;
				return company;
			} catch(e) {
				console.error("company couldn't be fetched", e);
			}
			state.fetchAccountPromise = null;
		}
	},
	async createPendingSubscription({state}, {provider, plan_name, progress}) {
		//Block calling this method until response is resolved
		if(!state.canRetryToSub) return;
		state.canRetryToSub = false;

		const account = state.company;
		const country_code = await GetCountryCode(state);
		try {
			let res = await httpInstance.POST(
				`/payments/subscriptions/pending/${provider}?account_id=${account.id}&plan_name=${plan_name}`
				+ `&country_code=${country_code}`
			);
			if(progress) progress.finish();
			location.href = res.data.approval_url;
			state.canRetryToSub = true;
			analytics.Track("pending_subscription_created");
		} catch (e) {
			if(progress) progress.fail();
			state.canRetryToSub = true;
			console.error("Subscription creation failed", e);
		}
	}
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
};
