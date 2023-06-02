var app = angular.module('LuxuryShop', []);
app.controller("CartCtrl", function ($scope, $http, $window) {
    $scope.current_img = _current_img;
    $scope.UserName;
    var user = JSON.parse($window.sessionStorage.getItem("user"));
    if (user != null) {
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
            url: current_url + '/api-nguoidung/loai-sp/getCategoriesByLanguage/' + $scope.value,
        }).then(function (response) {
            $scope.listCategories = response.data;
            console.log($scope.listCategories);
        });
    };


    $scope.cart = JSON.parse(localStorage.getItem('cart') || '[]');
    $scope.total_price = 0;

    if ($scope.cart != '') {
        for (var i = 0; i < $scope.cart.length; i++) {
            $scope.total_price += $scope.cart[i].quantity * $scope.cart[i].price;
        }
    }

    $scope.removeItem = function (item) {
        var itemIndex = $scope.cart.indexOf(item);
        $scope.cart.splice(itemIndex, 1);
        localStorage.setItem('cart', JSON.stringify($scope.cart));
        $window.location.reload();
    }

    $scope.increaseQuantity = function (item) {
        for (var i = 0; i < $scope.cart.length; i++) {
            if ($scope.cart[i].productID == item.productID) {
                $scope.cart[i].quantity++;
            }
        }
        localStorage.setItem('cart', JSON.stringify($scope.cart));
        $window.location.reload();
    }

    $scope.reduceQuantity = function (item) {
        for (var i = 0; i < $scope.cart.length; i++) {
            if ($scope.cart[i].productID == item.productID) {
                if ($scope.cart[i].quantity == 1) {
                    var itemIndex = $scope.cart.indexOf(item);
                    $scope.cart.splice(itemIndex, 1);
                }
                else {
                    $scope.cart[i].quantity--;
                }

            }
        }
        localStorage.setItem('cart', JSON.stringify($scope.cart));
        $window.location.reload();
    }

    $scope.listOrderByUser;
    $scope.loadOrderByUserName = function () {
        $http({
            method: 'GET',
            url: current_url + '/api-nguoidung/gio-hang/' + $scope.UserName + '/GetEmailUser',
        }).then(function (response) {
            $http({
                method: 'GET',
                url: current_url + '/api-nguoidung/gio-hang/' + response.data + '/GetListCartAll',
            }).then(function (response) {
                $scope.listOrderByUser = response.data;
                console.log($scope.listOrderByUser);
            });
        });
    }

    $scope.Dssp;
    
    $scope.NhanHang = function (item) {
        $http({
            method: 'GET',
            url: current_url + '/api-nguoidung/gio-hang/' + item.email +'/'+ item.orderID +'/GetListOrderByEmail',
        }).then(function (response) {
            $scope.Dssp = response.data;
        });
        $http({
            method: 'PUT',
            url: current_url + '/api-nguoidung/gio-hang/' + item.orderID + '/Update-Status-User',
        }).then(function (response) {
            alert('Nhận hàng thàng công !');
            var ChiTietDonHang = [];
            for (var i = 0; i < $scope.Dssp.length; i++) {
                var chitietsp = {};
                chitietsp.ProductID = $scope.Dssp[i].productID;
                chitietsp.Quantity = $scope.Dssp[i].quantity;
                chitietsp.Price = $scope.Dssp[i].price;
                chitietsp.Discount = 0;
                chitietsp.Status = 1;

                ChiTietDonHang.push(chitietsp);
            }
            console.log(ChiTietDonHang);
            $http({
                method: 'POST',
                data: { CustomerId: $scope.UserName, ExportBillDetails: ChiTietDonHang },
                url: current_url + '/api-nguoidung/gio-hang/CreateExportBill',
            }).then(function (response) {
                $window.location.reload();
            });
            

        });
    }
    $scope.loadOrderByUserName();
    $scope.LoadCategoryByLanguage();
});