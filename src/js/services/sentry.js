import * as Sentry from "@sentry/vue";
import { Integrations } from "@sentry/tracing";
import { CaptureConsole } from "@sentry/integrations";
import { ENVIRONEMENT } from "@js/common/config";

export const InitSentry = (Vue, router) => {
	Sentry.init({
		Vue,
		trackComponents: true,
		release: 2.1,
		environment: ENVIRONEMENT,
		dsn: "https://ef8ab86191654fd698166c4d92cba028@glitchtip.kernel.tools/1",
		integrations: [
			new CaptureConsole({
				levels: ["error"],
			}),
			new Integrations.BrowserTracing({
				routingInstrumentation: Sentry.vueRouterInstrumentation(router),
				tracingOrigins: ["localhost", "dev.kernel.tools", "stable.kernel.tools", "kernel.tools", /^\//],
			})
		],
		tracesSampleRate: 1.0,
		maxBreadcrumbs: 50,
		normalizeDepth: 5,
		denyUrls: [
			"https://api.segment.io/v1/m",
			// Chrome extensions
			/extensions\//i,
			/^chrome:\/\//i,
		],
		// beforeBreadcrumb(breadcrumb, hint) {
		// 	const hasData = breadcrumb && breadcrumb.data;
		// 	const hasKernelURL = breadcrumb.data.url && breadcrumb.data.url.match
		// 		&& !breadcrumb.data.url.match(/kernel.tools/);
		// 	const hasSuccessfullStatus = breadcrumb.data.status_code && breadcrumb.data.status_code < 400;
		// 	console.log(hasKernelURL, hasSuccessfullStatus);
		// 	// if(hasData && (hasKernelURL || hasSuccessfullStatus)) {
		// 	// 	return null;
		// 	// } 
			
		// 	return breadcrumb;
		// }
	});

};