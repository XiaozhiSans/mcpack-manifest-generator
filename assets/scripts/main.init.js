import {mcpackM} from "./libs/main.lib.js";
import {lang} from "./libs/lang.js";
import {cAS} from "./libs/copy.and.save.js";
import info from "./libs/info.js";
import sw from "./libs/sw.lib.js";
globalThis.mcpackM = mcpackM, globalThis.lang = lang, globalThis.cAS = cAS;
globalThis.findEle = (ele) => {return document.querySelector(ele);};
globalThis.findEles = (ele) => {return document.querySelectorAll(ele);};

console.log("init service worker");
sw();

console.log("init mult-language");
lang.getSettings();

console.log("init info");
info();
