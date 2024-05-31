import {languages} from "./languages.js";
globalThis.languages = languages;

export const lang = {
	change(lang) {
		this.set(lang);
		this.getSettings();
	},
	getSettings() {
		let f, cookies = document.cookie.split("; ");
		for(let cookie of cookies) {
			if(cookie.startsWith("lang")) {
				f = true;
				globalThis.Lang = cookie.split('=')[1];
				lang.setLang(Lang);
				break;
			} else continue;
		}
		(f)? null: lang.init();
	},
	init() {
		if(navigator.language) {
			let lang = navigator.language.split('-')[0];
			this.set(lang);
			this.getSettings();
		} else {
			console.log("your browser not support `navigator.language`");
			this.set("en");
		};
	},
	set(lang) {
		let date = new Date();
		date.setDate(date.getDate() + 7); // default expires is 7 days
		document.cookie = `lang=${lang}; expires=${date}`;
	},
	setLang(langName) {
		console.log(`will use "${langName}" as display language`);
		document.querySelector("[mcpackMl]").innerHTML = langName;
		let lang = eval(`languages.${langName}`);
		let keys = Object.keys(lang);
		let values = Object.values(lang);
		document.querySelector("html").lang = langName;
		for(let i in keys) {
			for(let j of document.querySelectorAll(`[${keys[i]}]`)) j.innerHTML = values[i];
		}
	}
}
