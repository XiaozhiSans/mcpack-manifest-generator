import languages from "./languages.json" with {type: "json"};
// globalThis.languages = languages;

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
				globalThis.displayLang = cookie.split('=')[1];
				lang.setLang(displayLang);
				break;
			} else continue;
		}
		(f)? null: this.init();
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
		let displayLang = eval(`languages.${langName}`);
		document.querySelector("html").lang = langName;

		displayLang.forEach(l => {
			lang.innerText(l[0], l[1]);
		});
	},
	innerText(ele, text) {
		findEles(`[${ele}]`).forEach(e => {
			e.innerHTML = text;
		});
	}
}
