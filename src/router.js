import Vue from "vue";
import store from "@/store";
import analytics from "@js/services/analytics.service";
import i18n from "@js/locale";

Vue.use(VueRouter);

import VueRouter from "vue-router";


const routes = [

];

//Modify router prototype to ignore unnecessary errors
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
	if (onResolve || onReject)
		return originalPush.call(this, location, onResolve, onReject);
	return originalPush.call(this, location).catch(err => {
		if (VueRouter.isNavigationFailure(err)) {
			return err;
		}
		// rethrow error
		return Promise.reject(err);
	});
};

const router = new VueRouter({
	mode: "history",
	routes,
	scrollBehavior(to, from, saved) {
		if (saved) return saved;
		return {x: 0, y: 0};
	}
});

/**
 * Getting auth required property and redirecting user properly
 */
router.beforeEach(async (to, from, next) => {
	if (to.name !== "Home" && to.name !== from.name && !to.meta.rl) {
		analytics.Page(to.name);
	}
	const authRequired = to.matched.some(record => record.meta.authRequired);
	// let user = store.getters["user/current"];
	let isAuthenticated = store.getters["auth/isAuthenticated"];
	// eslint-disable-next-line no-undef
	// if(authRequired && !isAuthenticated) {
	// 	await store.dispatch("user/fetchUser");
	// }
	if (authRequired && !isAuthenticated && to.path !== "/logout") {
		//Using Get request query param to redirect after
		// Redirection to login cause of unauthorized request
		to.query.redirect = to.path;
		to.query.hash = to.hash;
		next({name: "SignIn", query: to.query, hash: to.hash});
	} else if ((to.path === "/sign-in" || to.path === "/sign-up") && isAuthenticated) {
		//Can't sign in if you already are
		next({path: "/", query: to.query});
	} else {
		if (store.getters["auth/isAuthenticated"]) {
			let uid = to.query["uid"];
			if (!uid || uid === "0") {
				if(store.getters["user/current"]) to.query.uid = store.getters["user/current"].id;
			}
		}
		//Set lang to route
		let lang = to.query["lang"];
		if (!lang || lang == "") {
			to.query.lang = i18n.locale;
			to.meta.rl = true;
			next({
				name: to.name,
				query: to.query,
				hash: to.hash,
				params: to.params,
				meta: to.meta
			});
		} else {
			next();
		}
	}
});

export default router;
