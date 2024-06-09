export default () => {(navigator.serviceWorker && !/^((127\.0\.0\.1)|(localhost))/.test(location.hostname))? (() => {
	navigator.serviceWorker.register("sw.js").then((registration) => {
		console.log(`[PWA] 已在该 Scope 注册 Service Worker: ${registration.scope}`);
	});
})(): (() => {
	console.log("[PWA] 浏览器不支持 Service Worker 或当前处于本地模式\n将不会注册 Service Worker");
})();}
