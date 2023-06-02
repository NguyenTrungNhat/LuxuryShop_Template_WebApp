var current_url = "http://localhost:4282";
var _current_img = "http://127.0.0.1:8887";
makeScript = function (url) {
	var script = document.createElement('script');
	script.setAttribute('src', url);
	script.setAttribute('type', 'text/javascript');
	document.getElementById('mainDiv').appendChild(script);
};