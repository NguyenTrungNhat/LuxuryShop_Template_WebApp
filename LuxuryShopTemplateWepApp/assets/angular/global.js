var current_url = "https://localhost:7099";
var current_url_admin = "https://localhost:7062";
var _current_img = "http://127.0.0.1:8887";
makeScript = function (url) {
	var script = document.createElement('script');
	script.setAttribute('src', url);
	script.setAttribute('type', 'text/javascript');
	document.getElementById('mainDiv').appendChild(script);
};