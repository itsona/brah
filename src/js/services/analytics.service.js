import { GetPixelCode } from "@js/services/geolocation.service";
import * as Sentry from "@sentry/vue";

import store from "@/store";

const fbq = window.fbq;
const amplitude = window.amplitude;
const userLeap = UserLeap;

class Analytics {
	constructor() {
		//Segment
		if (!window.analytics) {
			this._segment_loaded = false;
			this._listenToSegmentLoad();
		} else {
			this._segment_loaded = true;
		}
		//Pixel
		if (!window.fbq && !fbq) {
			this._pixel_loaded = false;
			this._listenToPixelLoad();
		} else {
			this._pixel_loaded = true;
			this._listenToPixelLoad(true);
		}
	}

	_listenToSegmentLoad() {
		const callback = e => {
			this._segment_loaded = true;
		};
		window.addEventListener("analytics_loaded", callback, false);
	}

	_listenToPixelLoad(done = false) {
		const callback = async () => {
			try {
				fbq("init", await GetPixelCode(store));
				fbq("track", "PageView");
				this._pixel_loaded = true;
			} catch (e) {
				console.error(e);
				this._pixel_loaded = false;
			}
		};
		if (done) callback().then();
		else window.addEventListener("pixel_loaded", callback, false);
	}

	GetAmplitudeDeviceID() {
		if (amplitude && amplitude.getInstance() && amplitude.getInstance().options)
			return amplitude.getInstance().options.deviceId;
		return "";
	}

	IdentifyUser(userID, userInfo) {
		Sentry.setUser(userInfo);
		Sentry.setTag("uid", userID);
		userInfo["mobile"] = !!window.isMobile;
		new Promise(resolve => {
			if (this._segment_loaded && window.analytics)
				window.analytics.identify(userID, userInfo);
			// if (this._pixel_loaded && fbq) fbq("trackCustom", "Identify", userInfo);
			if (userLeap) {
				userLeap("setUserId", userID);      
			}
			resolve();
		}).then();
	}

	Track(name, data) {
		new Promise(resolve => {
			if (this._segment_loaded && window.analytics)
				window.analytics.track(name, data);
			if (this._pixel_loaded && fbq) fbq("trackCustom", name);
			if (userLeap) userLeap("track", name);
			resolve();
		}).then();
	}

	Page(name, data) {
		new Promise(resolve => {
			if (this._segment_loaded && window.analytics)
				window.analytics.page(name, data);
			if (this._pixel_loaded && fbq)
				fbq("trackCustom", "Viewed " + name + " Page");
			resolve();
		}).then();
	}
}

const analytics = new Analytics();
export default analytics;
