"use strict";

// 缓存名称
const cacheName = "mcpackM-cache";

// 在线页面
const startPage = "/";
// 离线页面
const offlinePage = "/";

// 预缓存项
const filesToCache = [startPage, offlinePage];
// 不缓存项
const neverCacheUrls = [/*NotoSans*/];


// 初始化
self.addEventListener("install", (e) => {
	console.log("[PWA] Service Worker 初始化");
	e.waitUntil(
		caches.open(cacheName).then((cache) => {
			console.log("[PWA] Service Worker 正在缓存预缓存项");
			filesToCache.map((url) => {
				return cache.add(url).catch((reason) => {
					return console.log(`[PWA] url: ${url}; 原因: ${String(reason)};`);
				});
			});
		})
	);
});

// 激活
self.addEventListener("activate", (e) => {
	console.log("[PWA] Service Worker 正在激活");
	e.waitUntil(
		caches.keys().then((keyList) => {
			return Promise.all(keyList.map((key) => {
				if ( key !== cacheName ) {
					console.log(`[PWA] 旧的缓存已经移除, key: ${key}`);
					return caches.delete(key);
				}
			}));
		})
	);
	return self.clients.claim();
});

// 匹配
self.addEventListener("fetch", (e) => {
	
	// 如果请求在不缓存项内就跳过缓存
	if(!neverCacheUrls.every(checkNeverCacheList, e.request.url)) {
		console.log("[PWA] 当前请求在不缓存项内");
		return;
	}
	
	// 如果请求的协议不是 http 或 https 就跳过缓存
	if(!e.request.url.match(/^(http|https):\/\//i))
		// return;
	
	// 如果请求来自其他域名就跳过缓存
	if(new URL(e.request.url).origin !== location.origin)
		// return;
	
	// 对于 POST 请求,不缓存并在离线时提供离线页面
	if(e.request.method !== "GET") {
		e.respondWith(
			fetch(e.request).catch(() => {
				return caches.match(offlinePage);
			})
		);
		return;
	}
	
	// 跳转策略
	if(e.request.mode === "navigate" && navigator.onLine) {
		e.respondWith(
			fetch(e.request).then((response) => {
				return caches.open(cacheName).then((cache) => {
					cache.put(e.request, response.clone());
					return response;
				});
			})
		);
		return;
	}

	e.respondWith(
		caches.match(e.request).then((response) => {
			return response || fetch(e.request).then((response) => {
				return caches.open(cacheName).then((cache) => {
					cache.put(e.request, response.clone());
					return response;
				});
			});
		}).catch(() => {
			return caches.match(offlinePage);
		})
	);
});

// 辅助函数
// 检测传入的 url 是否在不缓存项
const checkNeverCacheList = (url) => {
	if(this.match(url)) {
		return false;
	}
	return true;
}
