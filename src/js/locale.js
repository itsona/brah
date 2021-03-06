import Vue from "vue";
import VueI18n from "vue-i18n";

import kaObject from "@lang/ka";
import enObject from "@lang/en";
import { getLocale } from "@js/common/persistent_locale";

Vue.use(VueI18n);
const i18n = new VueI18n({
	locale: getLocale(),
	fallbackLocale: "en",
	messages: {
		en: enObject,
		ka: kaObject,
	}
});
export default i18n;
