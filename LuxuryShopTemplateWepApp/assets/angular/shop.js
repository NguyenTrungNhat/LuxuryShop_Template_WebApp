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
    // $scope.page = 1;
    $scope.pageSize = 9;
    $scope.totalPages;
    $scope.PreviousPages = 0;
    $scope.NextPages = 0;


    $scope.LoadProductByLanguage = function (pageActive = 1) {
        $http({
            method: 'POST',
            data: { page: pageActive, pageSize: $scope.pageSize,languageId: $scope.value },
            url: current_url + '/api/Product/getProductByLanguage',
        }).then(function (response) {
            $scope.listProducts = response.data.data;
            $scope.totalPages= new Array((Math.ceil(response.data.totalItems / response.data.pageSize)));
            
            for ( i = 0; i < $scope.totalPages.length; i++){
                var j = i;
                $scope.totalPages[i] = ++j;
            }
            
            $scope.NextPages = response.data.page+1;
            $scope.PreviousPages = response.data.page-1;
            console.log($scope.totalPages[$scope.totalPages.length-1])
            if($scope.NextPages > $scope.totalPages[$scope.totalPages.length-1]){
                $scope.NextPages = 1;
            }
            if($scope.PreviousPages == 0){
                $scope.PreviousPages = $scope.totalPages[$scope.totalPages.length-1];
            }
        });
    };
    


    $scope.listProducts
    $scope.page = 1;
    $scope.pageSizeCate = 9;
    $scope.LoadProductByCate = function(x) {
        $http({
            method: 'POST',
            data: { page: $scope.page, pageSize: $scope.pageSizeCate,CatID: x.catID, languageId: $scope.value },
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