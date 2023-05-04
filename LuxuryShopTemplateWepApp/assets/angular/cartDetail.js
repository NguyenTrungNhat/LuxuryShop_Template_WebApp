var app = angular.module('LuxuryShop', []);
app.controller("CartDetailCtrl", function ($scope, $http, $window) {
    $scope.current_img = _current_img;
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
    var keyEmail = 'email';
    $scope.emailUser = window.location.search.substring(window.location.search.indexOf(keyEmail) + keyEmail.length + 1);

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

    $scope.listOrderByUser;
    $scope.loadOrderByUserName = function(){
        $http({
            method: 'GET',
            url: current_url + '/api/Carts/' + $scope.emailUser + '/GetListOrderByEmail',
        }).then(function (response) {
            $scope.listOrderByUser = response.data;
        });
    }
    $scope.loadOrderByUserName();
    $scope.LoadCategoryByLanguage();    
});