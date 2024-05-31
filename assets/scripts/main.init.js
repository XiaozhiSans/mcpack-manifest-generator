import {mcpackM} from "./libs/main.lib.js";
import {lang} from "./libs/lang.js";
import {cAS} from "./libs/copy.and.save.js";
globalThis.mcpackM = mcpackM, globalThis.lang = lang, globalThis.cAS = cAS;

console.log("init language");
lang.getSettings();
