var app = angular.module('LuxuryShop', []);
app.controller("HomeCtrl", function ($scope, $http, $window) {
    $scope.UserName;
    var user = JSON.parse($window.sessionStorage.getItem("user"));
    if(user != null){
        $scope.UserName = user.username;
    }  
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
    $scope.pageSize = 8;
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


    $scope.listProductsNew;
    $scope.Quantity = 4;
    $scope.LoadProductNew = function () {
        $http({
            method: 'POST',
            data: { Quantity: $scope.Quantity,LanguageId: $scope.value },
            url: current_url + '/api/Product/getProductNew',
        }).then(function (response) {
            $scope.listProductsNew = response.data;
            console.log($scope.listProductsNew);
        });
    };

    $scope.listProductsBestSeller;
    $scope.QuantitySeller = 8;
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

    $scope.handleButtonClick = function(x){
        const quantity = window.prompt('Số lượng cần mua?');
        if (quantity && !isNaN(quantity)) {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            const existingItem = cart.find(item => item.productID === x.productID);
            if (existingItem) {
                existingItem.quantity += Number(quantity);
            } else {
                cart.push({
                    ...x,
                    quantity: Number(quantity)
                });
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            alert("Thêm vào giỏ hàng thành công !");
        }
    };

    $scope.LoadCategoryByLanguage();
    $scope.LoadProductByLanguage();
    $scope.LoadProductNew();
    $scope.LoadProducBestSeller();
    
});