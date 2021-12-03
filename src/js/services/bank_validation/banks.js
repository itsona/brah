import banks from "./banks.json";

//Fill Banks map
const banks_map = {};
banks.banks.forEach(b => {
	banks_map[b.name_en] = b;
	banks_map[b.name_ka] = b;
});

export const GetBankByName = (name) => {
	return banks_map[name];
};

export const GetBankObjects = () => {
	return banks.banks;
};

export const GetBankNames = (locale = "en", country = "Georgia") => {
	locale = locale.substr(0, 2) === "en" ? "en" : "ka";
	let forCountry = banks.banks.filter(b => b.countries.includes(country));
	return forCountry.map(b => {
		return  b[`name_${locale}`];
	});
};

export const GetBanksForAC = (locale = "en", country = "Georgia") => {
	let forCountry = banks.banks.filter(b => b.countries.includes(country));
	return forCountry.map(b => {
		b.name =  b[`name_${locale}`];
		return {
			text: b.name,
			value: b
		};
	});
};

export const ValidateAccountNumber = (account_number, bank) => {
	let errors = [];
	if(bank.country_code === "PH") {
		if(account_number.length < bank.minLength || account_number.length > bank.maxLength) return ["invalid_account_number"];
		return errors;
	}
	if(!account_number || typeof account_number !== "string")
		errors.push("invalid_account_number");
	if(!bank || (bank && !bank.standard))
		return ["invalid_bank_object"];
	if(bank.standard !== "iban" || errors.length !== 0) return errors;
	if(account_number.length !== 22 || bank.iban_code.length !== 2) return ["invalid_account_number"];
	const iban_regex = new RegExp("^"+bank.country_code+"\\d{2}"+bank.iban_code+"\\d{16}$");
	if(!iban_regex.test(account_number.replaceAll(" ", "")) ) return ["invalid_account_number"];

	return [];
};
