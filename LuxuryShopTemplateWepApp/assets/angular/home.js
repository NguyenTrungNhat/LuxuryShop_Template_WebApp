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
    var key = 'LanguageId';
    var value = window.location.search.substring(window.location.search.indexOf(key) + key.length + 1);
    if (value == '') {
        value = 'vi-VN'
    }
    $scope.listCategories;
    $scope.LoadCategoryByLanguage = function () {
        $http({
            method: 'GET',
            url: current_url + '/api/Categories/getCategoriesByLanguage/' + value,
        }).then(function (response) {
            $scope.listCategories = response.data;
            console.log($scope.listCategories)
        });
    };

    $scope.listProducts;
    $scope.page = 1;
    $scope.pageSize = 8;
    $scope.languageId = value;
    $scope.LoadProductByLanguage = function () {
        $http({
            method: 'POST',
            data: { page: $scope.page, pageSize: $scope.pageSize,languageId: $scope.languageId },
            url: current_url + '/api/Product/getProductByLanguage',
        }).then(function (response) {
            $scope.listProducts = response.data.data;
            console.log($scope.listProducts)
        });
    };


    $scope.listProductsNew;
    $scope.Quantity = 4;
    $scope.LoadProductNew = function () {
        $http({
            method: 'POST',
            data: { Quantity: $scope.Quantity,LanguageId: $scope.languageId },
            url: current_url + '/api/Product/getProductNew',
        }).then(function (response) {
            $scope.listProductsNew = response.data;
            console.log($scope.listProductsNew)
        });
    };

    $scope.listProductsBestSeller;
    $scope.QuantitySeller = 8;
    $scope.LoadProducBestSeller = function () {
        $http({
            method: 'POST',
            data: { Quantity: $scope.QuantitySeller,LanguageId: $scope.languageId },
            url: current_url + '/api/Product/getProductBestSeller',
        }).then(function (response) {
            $scope.listProductsBestSeller = response.data;
            console.log($scope.listProductsBestSeller)
        });
    };


    $scope.LoadCategoryByLanguage();
    $scope.LoadProductByLanguage();
    $scope.LoadProductNew();
    $scope.LoadProducBestSeller();
});