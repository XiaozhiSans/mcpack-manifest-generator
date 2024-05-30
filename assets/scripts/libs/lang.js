import {languages} from "./languages.js";
globalThis.languages = languages;

export const lang = {
	change(lang) {
		this.set(lang);
		this.getSettings();
	},
	getSettings() {
		let cookies = document.cookie.split("; ");
		for(let cookie of cookies) {
			if(cookie.startsWith("mcpmgLang")) {
				globalThis.mcpmgLang = cookie.split('=')[1];
				this.setLang(mcpmgLang)
				return;
			} else continue;
		}
		this.init();
	},
	init() {
		if(navigator.language) {
			let lang = navigator.language.split('-')[0];
			this.set(lang);
		} else console.error("your browser not support `navigator.language`");
	},
	set(lang) {
		let date = new Date();
		date.setDate(date.getDate() + 7); // default expires is 7 days
		document.cookie = `mcpmgLang=${lang}; expires=${date}`;
	},
	setLang(langName) {
		console.log(`will use "${langName}" as display language`);
		window.onload = document.querySelector("[mcpmgLang]").innerHTML = langName;
		let lang = eval(`languages.${langName}`);
		let keys = Object.keys(lang);
		let values = Object.values(lang);
		document.querySelector("html").setAttribute("lang", langName);
		for(let i in keys) {
			for(let j of document.querySelectorAll(`[${keys[i]}]`)) j.innerHTML = values[i];
		}
	}
}
