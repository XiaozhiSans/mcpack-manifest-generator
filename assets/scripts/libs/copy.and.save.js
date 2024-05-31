export const cAS = {
	copy() {
		document.querySelector("input#result").select();
		document.execCommand("copy");
		window.alert("success!");
	},
	save() {
		if(eval(result.getAttribute("isUUID"))) return;
		if(result.value == '') return;
		let blob = new Blob([result.value], {
			type: "text/json;charset=utf-8"
		});
		let save = document.querySelector("a#save");
		let url = window.URL.createObjectURL(blob);
		save.href = url;
		setTimeout(() => {
			URL.revokeObjectURL(url);
		}, 5000); // after 5s revoke url
		save.click();
	}
}
