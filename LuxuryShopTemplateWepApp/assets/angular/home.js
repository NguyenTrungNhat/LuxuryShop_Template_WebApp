var app = angular.module('LuxuryShop', []);
app.controller("HomeCtrl", function ($scope, $http) {
    // $scope.listSanPhamMoi;  
    // $scope.LoadSanPhamMoi = function () {		 
    //     $http({
    //         method: 'GET', 
    //         url: current_url + '/api/Home/get-moi/10',
    //     }).then(function (response) {			 
    //         $scope.listSanPhamMoi = response.data;
	// 		makeScript('js/main.js')
    //     });
    // };  

    $scope.listCategories;  
    $scope.LoadCategoryByLanguage = function () { 
		var key = 'LanguageId';
		var value = window.location.search.substring(window.location.search.indexOf(key)+key.length+1);		 
        $http({
            method: 'GET', 
            url: current_url + '/api/Categories/getCategoriesByLanguage/'+value,
        }).then(function (response) { 
            $scope.listCategories = response.data;
            console.log($scope.listCategories)
			makeScript('/assets/js/main.js')
        });
    };  
});