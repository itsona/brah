
export default function newBroadcastChannel(name) {
	try {
		const bc_defined = (typeof BroadcastChannel) !== "undefined";
		if(bc_defined) {
			return new BroadcastChannel(name);
		}
	} catch (e) {
		console.error("BroadcastChannel not supported!", e);
	}
	return new CustomBroadcaster(name);

}

class CustomBroadcaster {
	constructor(name) {
		this._name = name;
		this.onmessage = (msg) => console.log(msg);
		window.addEventListener(this._name, (msg) => this.onmessage({data: msg.detail}), false);
	}

	postMessage(data) {
		window.dispatchEvent(new CustomEvent(this._name, { detail: data }));
	}

	close() {
		window.removeEventListener(this._name, (msg) => this.onmessage(msg.detail), false);
	}
}
