import Vue from "vue";

Vue.use(VueRouter);

import VueRouter from "vue-router";
import Home from "./Home";
import Clients from "./Clients";
import ReportsChart from "./ReportsChart";

const routes = [

	{
		path: "/",
		name: "Home",
		component: Home
	},
	{
		path: "/clients",
		name: "Clients",
		component: Clients,
	},
	{
		path: "/reports",
		name: "Reports",
		component: ReportsChart,
	},
];


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

export default router;
