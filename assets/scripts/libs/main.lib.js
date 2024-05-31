globalThis.result = document.querySelector("#result");

export const mcpackM = {
	Manifest: function(name, description, version, minBedrockVersion, type) {
		let mBv = minBedrockVersion.split('.');
		this.format_version = (mBv[0] == 1 && mBv[1] >= 13)? 2: 1;
		this.header = {
			description: description,
			name: name,
			version: version.split('.').map(Number),
			min_engine_version: minBedrockVersion.split('.').map(Number)
		};
		this.modules = [{
			type: type,
			version: version.split('.').map(Number)
		}]
		this.header.uuid = this.modules[0].uuid = mcpackM.generateUUID();
	},
	generateUUID() {
		let d = new Date().getTime();
		let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
			let r = (d + Math.random() * 16) % 16 | 0;
			d = Math.floor(d / 16);
			return (c == 'x'? r: (r & 0x3 | 0x8)).toString(16);
		});
		return uuid;
	},
	generation() {
		const mcPackInfo = new FormData(document.querySelector("form#mcPackInfo"));
		let mBv = mcPackInfo.get("minBedrockVersion");
		if(mBv.split('.')[0] == 0 && mBv.split('.')[1] < 16) {
			alert("min bedrock version is too low!!\nlowest: 0.16.0");
			return;
		}
		result.setAttribute("isUUID", false);
		result.value = (JSON.stringify(new this.Manifest(mcPackInfo.get("name"), mcPackInfo.get("description"), mcPackInfo.get("version"), mBv, mcPackInfo.get("type"))));
		document.querySelector("#buttonPanel").style.display = "inline";
		window.alert("success!");
	},
	version: {
		number: [0, 2, 1],
		build: "20240531",
		name: "beta"
	},
	getVer() {
		let version = this.version;
		return `${version.name[0].toUpperCase() + version.name.slice(1)} v${version.number.join('.')}(${version.build})`;
	},
	getUUID() {
		result.setAttribute("isUUID", true);
		result.value = mcpackM.generateUUID();
		document.querySelector("#buttonPanel").style.display = 'inline';
	}
}

document.querySelectorAll("[mcpackMv]").forEach(element => {
	element.innerHTML = mcpackM.getVer();
});

console.log(`mcpackM version: ${mcpackM.getVer()}`);
