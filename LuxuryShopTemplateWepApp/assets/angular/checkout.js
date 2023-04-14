var app = angular.module('LuxuryShop', []);
app.controller("CheckoutCtrl", function ($scope, $http, $window) {
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

    $scope.FullName;
    $scope.Address;
    $scope.Email;
    $scope.Phone;

    $scope.Order = function() {
        var KhachHang = {};
        KhachHang.FullName = $scope.FullName;
        KhachHang.Address = $scope.Address;
        KhachHang.Email = $scope.Email;
        KhachHang.Phone = $scope.Phone;

        var ChiTietDonHang = [];
        for(var i =0;i<$scope.cart.length;i++){
            ChiTietDonHang.push($scope.cart[i]);
        }

        console.log(KhachHang);
        console.log(ChiTietDonHang);

        $http({
            method: 'POST',
            data : {Customer : KhachHang, OrderDetails : ChiTietDonHang},
            url: current_url + '/api/Carts/CreateOrder',
        }).then(function (response) {
            alert('Thanh toán thành công !');
            localStorage.removeItem('cart');
            $window.location.href = 'E:/testcode/Năm 3/Kì 2/Lập Trình Web API/BTL_WEB_API_ShopQuanAo/Template/WepApp/LuxuryShopTemplateWepApp/index.html?LanguageId=' + $scope.value;
        });
    }


    $scope.LoadCategoryByLanguage();    
});