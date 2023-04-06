var current_url = "https://localhost:7099";
var current_url_admin = "https://localhost:7062";
var current_img = "E:\\testcode\\Năm 3\\Kì 2\\Lập Trình Web API\\BTL_WEB_API_ShopQuanAo\\Image"; 
makeScript = function (url) {
	var script = document.createElement('script');
	script.setAttribute('src', url);
	script.setAttribute('type', 'text/javascript');
	document.getElementById('mainDiv').appendChild(script);
};