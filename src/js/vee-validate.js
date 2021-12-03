import { extend } from "vee-validate";
import {
	required,
	email,
	min,
	max,
	digits,
	length,
	numeric,
	min_value,
	max_value,
	confirmed,
	regex,
} from "vee-validate/dist/rules";
import i18n from "./locale";

extend("required", {
	...required,
	// the values param is the placeholders values
	message: (_, values) => i18n.t("validation.required", values),
});
extend("digits", {
	...digits,
	// the values param is the placeholders values
	message: (_, values) => i18n.t("validation.digits", values),
});
extend("numeric", {
	...numeric,
	// the values param is the placeholders values
	message: (_, values) => i18n.t("validation.digits", values),
});
// Install email rule and message.
extend("email", {
	...email,
	// the values param is the placeholders values
	message: (_, values) => i18n.t("validation.email", values),
});
// Install min rule and message.
extend("min", {
	...min,
	// the values param is the placeholders values
	message: (_, values) => i18n.t("validation.min", values),
});
// Install length rule and message.
extend("length", {
	...length,
	// the values param is the placeholders values
	message: (_, values) => i18n.t("validation.length", values),
});
// Install min rule and message.
extend("max", {
	...max,
	// the values param is the placeholders values
	message: (_, values) => i18n.t("validation.max", values),
});
// Install min rule and message.
extend("min_value", {
	...min_value,
	// the values param is the placeholders values
	message: (_, values) => i18n.t("validation.min_value", values),
});
// Install min rule and message.
extend("max_value", {
	...max_value,
	// the values param is the placeholders values
	message: (_, values) => i18n.t("validation.max_value", values),
});

// Install min rule and message.
extend("confirmed", {
	...confirmed,
	// the values param is the placeholders values
	message: (_, values) => i18n.t("validation.confirmed", values),
});
// Install min rule and message.
extend("regex", {
	...regex,
	// the values param is the placeholders values
	message: (_, values) => i18n.t("validation.regex", values),
});
