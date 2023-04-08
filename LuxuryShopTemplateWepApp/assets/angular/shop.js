var app = angular.module('LuxuryShop', []);
app.controller("ShopCtrl", function ($scope, $http, $window) {
    var key = 'LanguageId';
    $scope.value = window.location.search.substring(window.location.search.indexOf(key) + key.length + 1);
    if ($scope.value == '') {
        $scope.value = 'vi-VN'
    }

    $scope.listCategories;
    $scope.LoadCategoryByLanguage = function () {
        $http({
            method: 'GET',
            url: current_url + '/api/Categories/getCategoriesByLanguage/' + $scope.value,
        }).then(function (response) {
            $scope.listCategories = response.data;
            console.log($scope.listCategories);
        });
    };

    $scope.listProducts;
    $scope.page = 1;
    $scope.pageSize = 9;
    $scope.LoadProductByLanguage = function () {
        $http({
            method: 'POST',
            data: { page: $scope.page, pageSize: $scope.pageSize,languageId: $scope.value },
            url: current_url + '/api/Product/getProductByLanguage',
        }).then(function (response) {
            $scope.listProducts = response.data.data;
            console.log($scope.listProducts);
        });
    };


    $scope.listProducts
    $scope.page = 1;
    $scope.pageSize = 9;
    $scope.LoadProductByCate = function(x) {
        $http({
            method: 'POST',
            data: { page: $scope.page, pageSize: $scope.pageSize,CatID: x.catID, languageId: $scope.value },
            url: current_url + '/api/Product/getProductByCate',
        }).then(function (response) {
            $scope.listProducts = response.data.data;
        });
        
    };

    
    

    $scope.listProductsBestSeller;
    $scope.QuantitySeller = 3;
    $scope.LoadProducBestSeller = function () {
        $http({
            method: 'POST',
            data: { Quantity: $scope.QuantitySeller,LanguageId: $scope.value },
            url: current_url + '/api/Product/getProductBestSeller',
        }).then(function (response) {
            $scope.listProductsBestSeller = response.data;
            console.log($scope.listProductsBestSeller);
        });
    };

    

    $scope.LoadCategoryByLanguage();
    $scope.LoadProductByLanguage();
    $scope.LoadProducBestSeller();
});