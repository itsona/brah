import Vue from "vue";
import vuetify from "@/plugins/vuetify"; // path to vuetify export
import store from "./store";
//Global Helper
import { Gotcha } from "./js/common/helpers";
Vue.prototype.$Gotcha = Gotcha;

//HTTP service
import HTTP from "@js/services/http.service";
Vue.prototype.$http = httpInstance;
//Setup Global Storage
import storage from "@js/services/GlobalStorage.service";
Vue.prototype.$storage = storage;
import App from "./App.vue";
import router from "./router";
import VueI18n from "vue-i18n";
import i18n from "@js/locale";
import vuetifyMoney from "@components/VuetifyMoney";
import "@js/vee-validate";
import VueProgressBar from "vue-progressbar";
import VueMeta from "vue-meta";
import VueCookies from "vue-cookies";
import httpInstance from "@js/services/http.service";
import { InitSentry } from "./js/services/sentry";

Vue.use(VueI18n);
Vue.use(VueMeta);
Vue.use(VueCookies);
Vue.use(VueProgressBar, {
	color: "#00d369",
	thickness: "4px",
	transition: {
		speed: "0.2s",
		opacity: "1s",
		termination: 300
	}
});
Vue.$cookies.config("7d");
// Vue.component("Snackbar", Snackbar);
Vue.component("vuetify-money", vuetifyMoney);
Vue.config.productionTip = false;

// Sentry / Glitchtip integration
InitSentry(Vue, router);

export const app = new Vue({
	router,
	store,
	vuetify,
	i18n,
	render: h => h(App)
}).$mount("#app");

HTTP.initializeInterceptors(store, router);
