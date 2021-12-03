import Vue from "vue";
import Vuetify from "vuetify";

Vue.use(Vuetify);

const opts = {
	theme: {
		themes: {
			light: {
				secondary: "#293961",
				primary: "#00d369",
				accent: "#293961",
			},
		},
	},
};

export default new Vuetify(opts);
