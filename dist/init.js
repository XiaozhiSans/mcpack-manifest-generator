(() => {
	let link = document.createElement("link");
	link.rel = "stylesheet";
	link.type= "text/css";
	link.href= "./dist/init.css";

	document.querySelector("head").appendChild(link);
})();
import {info} from "./libs/info.js";
info.init();

import {sounds, playSound} from "./libs/sounds.js";
globalThis.sounds = sounds, globalThis.playSound = playSound;
for(let i of document.querySelectorAll("button:not(header>button)")) i.addEventListener("click", () => {playSound(sounds.click);});

import {main} from "./libs/main.js";
globalThis.main = main;
