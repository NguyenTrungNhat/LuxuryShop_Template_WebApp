var app = angular.module('LuxuryShop', []);
app.controller("CartCtrl", function ($scope, $http, $window) {
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

    
    $scope.cart = JSON.parse(localStorage.getItem('cart') || '[]');
    $scope.total_price = 0;

    if($scope.cart != ''){
        for(var i =0;i<$scope.cart.length;i++){
            $scope.total_price += $scope.cart[i].quantity * $scope.cart[i].price;
        }
    }

    $scope.removeItem = function(item) {
        var itemIndex = $scope.cart.indexOf(item);
        $scope.cart.splice(itemIndex,1);
        localStorage.setItem('cart', JSON.stringify($scope.cart));
        $window.location.reload();
    }

    $scope.increaseQuantity = function(item) {
        for(var i =0;i<$scope.cart.length;i++){
            if($scope.cart[i].productID == item.productID){
                $scope.cart[i].quantity++;
            }
        }
        localStorage.setItem('cart', JSON.stringify($scope.cart));
        $window.location.reload();
    }

    $scope.reduceQuantity = function(item) {
        for(var i =0;i<$scope.cart.length;i++){
            if($scope.cart[i].productID == item.productID){
                if($scope.cart[i].quantity == 1){
                    var itemIndex = $scope.cart.indexOf(item);
                    $scope.cart.splice(itemIndex,1);
                }
                else{
                    $scope.cart[i].quantity--;
                }
                
            }
        }
        localStorage.setItem('cart', JSON.stringify($scope.cart));
        $window.location.reload();
    }
    $scope.LoadCategoryByLanguage();    
});