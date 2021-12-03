export const isMobile = () =>
	/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		navigator.userAgent
	) ||
  screen.width < 700 ||
  window.innerWidth < 960;

export const textWrapper = (text, max_len = 10) =>
	isMobile() && text.length > max_len ? text.substr(0, max_len) + "..." : text;

export const hasOnlyDigits = text => /^-?\d+$/.test(text);

export const catchError = err => {
	console.error(err);
	if (err.response) console.error(err.response);
};
//Given 2 objects return if they have same values
export const areEquals = (obj1, obj2) => {
	if(obj1 === undefined || obj2 === undefined || obj1 === null || obj2 === null){
		return obj1 === obj2;
	}
	const obj1Keys = Object.keys(obj1);
	const obj2Keys = Object.keys(obj2);
	if(!obj1Keys || !obj2Keys) return obj1 === obj2;
	if (obj1Keys.length !== obj2Keys.length) {
		return false;
	}

	for (let objKey of obj1Keys) if (obj1[objKey] !== obj2[objKey]) {
		if(!areEquals(obj1[objKey], obj2[objKey])) return false;
	}

	return true;
};

export const printPDF = (pdfLink)=> {
	let iframe = document.createElement("iframe");
	document.body.appendChild(iframe);
	iframe.style.display = "none";
	iframe.onload = function () {
		setTimeout(function () {
			iframe.focus();
			iframe.contentWindow.print();
		}, 1);
	};
	iframe.src = pdfLink;
	return iframe;
};


export const scrollTo = el => {
	const element = document.querySelector(el);
	if (element) {
		element.scrollIntoView({
			behavior: "smooth",
			block: "center",
			inline: "nearest"
		});
	}
};
export const scrollToValidation = (el = ".error--text:first-of-type", err=undefined) => {
	scrollTo(el);
	if(err) {
		console.error(err);
		if (err.response) console.error(err.response);
	}
};

export const onEnterSubmit = (can, callBack) => {
	document.addEventListener("keyup", (event) => {
		if (event.keyCode === 13 && can()) {
			callBack();
		}
	});
};

export const preventDefault = function (e){
	if(e.target === document.activeElement) e.preventDefault();
};

export const DownloadFileFromBytes = function(data, filename) {
	const url = window.URL.createObjectURL(new Blob([data]));
	const link = document.createElement("a");
	link.href = url;
	link.style.display = "none";
	link.setAttribute("download", filename);
	document.body.appendChild(link);
	link.click();
};

//Concise handler for async functions
export const Gotcha = async promise => {
	try {
		let resp = await promise;
		return [resp, undefined];
	} catch(err) {
		return [undefined, err];
	}
};