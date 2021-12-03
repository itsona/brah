import SignIn from "@views/auth/SignIn";
import SignUp from "@views/auth/SignUp";
import Logout from "@views/auth/Logout";
import PasswordForgotten from "@views/auth/PasswordForgotten";
import PasswordReset from "@views/auth/PasswordReset";

export default [
	{
		path: "/logout",
		name: "Logout",
		component: Logout,
		meta: {
			authRequired: true,
		},
	},

	{
		path: "/sign-in",
		name: "SignIn",
		component: SignIn,
	},

	{
		path: "/sign-up",
		name: "SignUp",
		component: SignUp,
	},

	{
		path: "/password-forgotten",
		name: "PasswordForgotten",
		component: PasswordForgotten,
	},
	{
		path: "/password-reset",
		name: "PasswordReset",
		component: PasswordReset,
	},
];
